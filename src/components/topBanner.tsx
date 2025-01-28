'use client';

import { X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const TopBanner = () => {
  const [isVisible,setisVisible] = useState("true")
  if (isVisible === "false") {
    return null;
  }
  return (
    <div className="bg-black text-white text-center py-2 ">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">
          Sign up and get 20% off to your first order.{"  "}
          <Link href="/auth?tab=signup" className="underline font-medium hover:text-gray-200">
            Sign Up Now
          </Link>
        </p>
        <X
          className="hover:text-gray-200 absolute right-0 top-1/2 -translate-y-1/2 sm:w-fit sm:h-fit p-1 flex sm:mr-10 lg:mr-28"
          onClick={() => setisVisible("false")}
        />
      </div>
    </div>
  );
};

export default TopBanner;