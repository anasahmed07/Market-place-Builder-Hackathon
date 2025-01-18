import Image from "next/image"
import Link from "next/link"
import { integralCF } from "@/styles/fonts"

export default function BrowseByDressStyle() {

    return (
        <div className={`${integralCF.variable} bg-gray-100 py-8 w-full max-w-[90vw] mx-auto rounded-3xl px-4 sm:px-6 lg:px-8 mb-10`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-extrabold text-black mb-8">BROWSE BY DRESS STYLE</h2>
            <div className="grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-5 gap-4 px-4 sm:px-2">
                <Link href="/shop/casual" className="sm:col-span-2">
                    <div className="relative overflow-hidden rounded-2xl bg-white">
                        <Image
                            src="/images/dressStyle/casual.png"
                            alt="casual wear"
                            className="w-full h-52 object-cover"
                            width={500}
                            height={300}
                        />
                        <div className="absolute top-4 left-4  px-4 py-2 rounded-xl">
                            <span className="text-3xl font-medium sm:text-4xl sm:font-semibold">Casual</span>
                        </div>
                    </div>
                </Link>
                <Link href="/shop/formal" className="sm:col-span-3">
                    <div className="relative overflow-hidden rounded-2xl bg-white">
                        <Image
                            src="/images/dressStyle/formal.png"
                            alt="formal dresses"
                            className="w-full h-52 object-cover"
                            width={500}
                            height={300}
                        />
                        <div className="absolute top-4 left-4  px-4 py-2 rounded-xl">
                            <span className="text-3xl font-medium sm:text-4xl sm:font-semibold">Formal</span>
                        </div>
                    </div>
                </Link>
                <Link href="/shop/party" className="sm:col-span-3">
                    <div className="relative overflow-hidden rounded-2xl bg-white">
                        <Image
                            src="/images/dressStyle/party.png"
                            alt="party costumes"
                            className="w-full h-52 object-cover"
                            width={500}
                            height={300}
                        />
                        <div className="absolute top-4 left-4  px-4 py-2 rounded-xl">
                            <span className="text-3xl font-medium sm:text-4xl sm:font-semibold">Party</span>
                        </div>
                    </div>
                </Link>
                <Link href="/shop/gym" className="sm:col-span-2">
                    <div className="relative overflow-hidden rounded-2xl bg-white">
                        <Image
                            src="/images/dressStyle/gym.png"
                            alt="gym wear"
                            className="w-full h-52 object-cover"
                            width={500}
                            height={300}
                        />
                        <div className="absolute top-4 left-4  px-4 py-2 rounded-xl">
                            <span className="text-3xl font-medium sm:text-4xl sm:font-semibold">Gym</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}