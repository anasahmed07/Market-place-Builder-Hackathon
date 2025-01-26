'use client';
import Link from "next/link"
import { integralCF } from "@/styles/fonts"
import { ProductCard } from "./productCard"
import { TypeProduct } from "@/lib/types"

export default function ProductCardGroup(prams: { products: TypeProduct[]; url?: string; title: string }) {
  return (
    <section className="overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-300">
      <h2 className={`${integralCF.className} text-3xl md:text-5xl text-center font-extrabold text-black mb-8`}>
        {prams.title}
      </h2>
      <div className="relative">
        <div
          className="flex gap-4 whitespace-nowrap overflow-x-auto"
          style={{
            WebkitOverflowScrolling: "touch", // Smooth scrolling for touch devices
            scrollbarWidth: "none", // Hides scrollbar in Firefox
            msOverflowStyle: "none", // Hides scrollbar in IE and Edge
          }}
        >
          {prams.products.map((product) => (
            <ProductCard {...product} key={product.slug} />
          ))}
        </div>
        {/* Additional inline style for WebKit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Hides scrollbar for Chrome, Safari, and Opera */
          }
        `}</style>
      </div>
      {prams.url ? (
        <div className="text-center w-full mt-10">
          <Link
            href={`/shop#${prams.url}`}
            className="w-full font-medium text-lg text-black hover:bg-black hover:text-white transition-all duration-300 border-black border-2 h-9 px-9 py-2 rounded-full"
          >
            View All
          </Link>
        </div>
      ) : null}
    </section>
  );
}
