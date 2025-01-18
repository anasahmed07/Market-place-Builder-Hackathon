import {ShoppingCart} from "lucide-react"
import Link from "next/link";

const CartBtn = () => {

  return (
    <Link href="/cart" className="relative mr-[14px] p-1">
      <ShoppingCart/>
    </Link>
  );
};

export default CartBtn;