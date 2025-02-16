"use client";

import { useEffect, useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "./action";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
});

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [state.items]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!stripe || !elements) return;
    setIsProcessing(true);

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: values.name,
              email: values.email,
              phone: values.phone,
              address: {
                line1: values.address,
                city: values.city,
                state: values.state,
                postal_code: values.zipCode,
              },
            },
          },
        });

      if (stripeError) {
        toast({ title: "Payment Error", description: stripeError.message });
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const orderData = {
          customer: values,
          items: state.items,
          totalAmount: subtotal,
          paymentId: paymentIntent.id,
        };

        const response = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) throw new Error("Failed to create order");

        dispatch({ type: "CLEAR_CART" });
        // Optionally clear stored client secret & cart hash after a successful order
        localStorage.removeItem("clientSecret");
        localStorage.removeItem("cartHash");
        toast({ title: "Success", description: "Order placed successfully!" });
        // router.push(`/order-tracking/${paymentIntent.id}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: "An error occurred during checkout. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="max-w-4xl mb-28 mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {Object.keys(formSchema.shape).map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as keyof typeof formSchema.shape}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Payment Details
                </h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isProcessing || !stripe}
              >
                {isProcessing ? "Processing..." : `Pay $${subtotal.toFixed(2)}`}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {state.items.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex justify-between mb-2"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-300 mt-4 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { state } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize subtotal to prevent unnecessary recalculations
  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [state.items]
  );

  // Create a hash representing the current cart
  const cartHash = useMemo(
    () =>
      JSON.stringify(
        state.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      ),
    [state.items]
  );

  useEffect(() => {
    if (state.items.length > 0) {
      // Check if a valid client secret already exists in localStorage
      const storedCartHash = localStorage.getItem("cartHash");
      const storedClientSecret = localStorage.getItem("clientSecret");

      if (storedClientSecret && storedCartHash === cartHash) {
        setClientSecret(storedClientSecret);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      createPaymentIntent(Math.round(subtotal * 100))
        .then(({ clientSecret }) => {
          setClientSecret(clientSecret);
          if (clientSecret) {
            localStorage.setItem("clientSecret", clientSecret);
          }
          localStorage.setItem("cartHash", cartHash);
        })
        .catch((error) => {
          console.error("Payment intent error:", error);
          toast({
            title: "Error",
            description: "Failed to initialize payment system",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [state.items, cartHash, subtotal]);

  if (isLoading) {
    return <div className="text-center p-8">Loading checkout...</div>;
  }

  if (!clientSecret) {
    return <div className="text-center p-8">Your cart is empty.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}
