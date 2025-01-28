import { TypeProduct } from "@/lib/types";
import Rating from "./rating";
import Image from "next/image";
import Link from "next/link";
import { satoshi } from "@/styles/fonts";
import ProductPrice from "./productPrice";

export function ProductCard(prams: TypeProduct) {

    return (
        <div className={`${satoshi.className} whitespace-normal flex min-w-48 space-y-5 rounded-2xl p-2 cursor-pointer hover:shadow-md transition duration-300 ease-in-out`}>
            <Link href={`/shop/${prams.slug}`} className="mx-auto">
                <Image src={prams.image} alt={prams.name} width={300} height={300} className="mb-4 aspect-square rounded-2xl object-center object-cover" />
                <h3 className="text-lg font-semibold">{prams.name}</h3>
                <Rating rating={prams.rating} number={true}/>
                <div className="flex items-center">
                    <ProductPrice price={prams.price} discount={prams.discount} />
                </div>
            </Link>
        </div>
    )
}