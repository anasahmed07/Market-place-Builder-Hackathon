'use client';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Tag, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { satoshi } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import { removeFromCart, updateQuantity,addToCart } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import ProductPrice from "@/components/productPrice";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function Component() {
  const { dispatch, state } = useCart();
  const cartItems: CartItem[] = state.items;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount =   cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity * (item.discount ?? 0)) / 100,
      0
    );

  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;
  const formatPrice = (price: number) => price.toFixed(2)

  const handleRemoveItem = (item:CartItem) => {
    removeFromCart(dispatch, { id: String(item.id), name: '', price: 0, image: '', color: String(item.color), size: String(item.size) })
    const Undo = () => {
      addToCart(dispatch, item)
      toast({
        title: "Undone",
        description:"action undone",
        action:<ToastAction altText="dismiss">dismiss</ToastAction>
      })
    }
    toast({
      title: "Removed",
      description: `${item.quantity +" "+ item.name} was removed from your cart`,
      action: (
      <>
        <Button onClick={Undo}>Undo</Button>
        <ToastAction altText="dismiss">Dismiss</ToastAction>
      </>
      ),
    })
  }

  const handleUpdateQuantity = (id: string, color: string, size: string, newQuantity: number) => {
    const item = state.items.find(item => item.id.toString() === id && item.color === color && item.size === size)
    if (item) {
      updateQuantity(dispatch, { ...item, quantity: newQuantity })
    }
  }


  if (cartItems.length === 0) {
    return (
      <div className="max-w-frame mx-auto px-4 xl:px-0 h-[80vh]">
        <div className="flex items-center flex-col space-y-8 mt-32">
          <ShoppingCart size={100} className="text-gray-300" />
          <span className="block mb-4">Did&apos;nt Bought anything yet? Checkout our Products!</span>
          <Link
            className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-black h-9 px-4 py-2 rounded-full w-24"
            href="/shop"
          >
            Shop
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-40">
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-400">
                Home
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
            </li>
            <li className="flex items-center text-gray-800">Cart</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-extrabold mb-8">YOUR CART</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7 border border-gray-300 p-6 rounded-3xl">
            {cartItems.map((item) => (
              <div className="flex gap-4 py-6 border-b">
                <div className="relative h-24 w-24 rounded-lg bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className={cn("text-lg font-medium", satoshi.className)}>{item.name}</h3>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { handleRemoveItem(item)
                       }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <ProductPrice price={item.price} discount={item.discount}/>
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() => handleUpdateQuantity(item.id.toString(), item.color, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 flex items-center justify-center text-lg border-r disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="h-8 w-12 flex items-center justify-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id.toString(), item.color, item.size, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center text-lg border-l"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-gray-300 rounded-3xl p-6 lg:p-8 lg:col-span-5">
            <h2 className={cn("text-xl font-medium mb-6", satoshi.className)}>Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">${formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-red-500">-${formatPrice(discount)}</span>
              </div>
              <div className="h-px bg-gray-200 my-4" />
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
              </div>

              <div className="flex gap-2 mt-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="w-full pl-10 pr-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors">
                  Apply
                </button>
              </div>
              <Link href="/checkout" passHref>
                <button className="w-full mt-4 px-6 py-4 bg-black text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                  <span>Go to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
