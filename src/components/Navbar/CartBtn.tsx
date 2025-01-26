'use client';

import Link from "next/link";
import {ShoppingCart} from "lucide-react"
import { useCart } from "@/context/CartContext";

const CartBtn = () => {
const { state } = useCart();
const cartCount = state.items.length;

  return (
    <Link href="/cart" className="relative mr-[14px] p-1">
      {(cartCount>0 &&<span className="absolute bg-red-500 translate-x-3 -translate-y-1 text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center">
        {cartCount}
      </span>)}
      <ShoppingCart/>
    </Link>
  );
};

export default CartBtn;