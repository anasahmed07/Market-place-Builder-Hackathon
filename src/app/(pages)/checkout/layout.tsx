"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export default function Layout({children,}: Readonly<{ children: React.ReactNode;}>) {
  
  return (
    <Elements stripe={stripePromise}>
          {children}
    </Elements>
  );
}
