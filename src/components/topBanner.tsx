import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-black text-white text-center py-2 ">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">
          Sign up and get 20% off to your first order.{"  "}
          <Link href="#" className="underline font-medium">
            Sign Up Now
          </Link>
        </p>
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex mr-10 lg:mr-28"
          size="icon"
          type="button"
        >
          <Image priority src="/icons/times.svg" height={13} width={13} alt="close icon"/>
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;