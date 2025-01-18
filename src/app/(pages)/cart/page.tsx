import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { CartItem } from "@/lib/types";

export default function Component() {
  // const cartItems: CartItem[] = []
  const cartItems: CartItem[] = [ 
    { id: 1, name: 'Gradient Graphic T-shirt', price: 145, image: "/images/products/gradient-graphic-t-shirt.png", size: 'Large', color: 'White', quantity: 1 },
    { id: 2, name: 'Checkered Shirt', price: 180, image: "/images/products/checkerd-shirt.png", size: 'Medium', color: 'Red', quantity: 2 },
    { id: 3, name: 'Skinny Fit Jeans', price: 240, image: "/images/products/skinny-fit-jeans.png", size: 'Large', color: 'Blue', quantity: 1 },
  ]

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;
  if (cartItems.length === 0) {
    return (
      <div className="max-w-frame mx-auto px-4 xl:px-0 h-[50vh]">
        <div className="flex items-center flex-col text-gray-300 mt-32">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-6xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 10l-2 -6"></path>
            <path d="M7 10l2 -6"></path>
            <path d="M15 20h-7.756a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304l-.36 2.055"></path>
            <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M19 16v3"></path>
            <path d="M19 22v.01"></path>
          </svg>
          <span className="block mb-4">Your shopping cart is empty.</span>
          <a
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-full w-24"
            href="/shop"
          >
            Shop
          </a>
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
              <div key={item.id} className="flex py-6 border-b">
                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base text-gray-900 font-semibold">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Color: {item.color}
                    </p>
                  </div>
                  <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex border bg-gray-200 rounded-full">
                      <button className="px-2 py-1 text-gray-600 hover:text-gray-700">
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center bg-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={item.quantity}
                        readOnly
                      />
                      <button className="px-2 py-1 text-gray-600 hover:text-gray-700">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="border border-gray-300 rounded-3xl px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="flow-root">
                <dl className="-my-4 text-sm">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-bold text-gray-900">${subtotal}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Discount (20%)</dt>
                    <dd className="font-bold text-red-500">
                      -${discount.toFixed(2)}
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Delivery Fee</dt>
                    <dd className="font-bold text-gray-900">${deliveryFee}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between border-t border-gray-200">
                    <dt className="text-base font-medium text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="block w-full rounded-full bg-gray-100 p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button className="ml-4 inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Apply
                  </button>
                </div>
                <button className="mt-6 w-full bg-black border border-transparent rounded-full shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Go to Checkout →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
