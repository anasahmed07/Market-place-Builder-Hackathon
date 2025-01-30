import Rating from "../rating";
import ProductPrice from "../productPrice";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { integralCF } from "@/styles/fonts";
import { detailedProductData } from "@/lib/types";
import ImageGallery from "./imageGallery";
import { useCart } from "@/context/CartContext"
import { addToCart } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast"
import { Button } from "../ui/button";


export default function ProductDatails({ product }: { product: detailedProductData }) {

  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  function handleAddToCart() {
    const item = {
      id: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor.toString(),
      size: selectedSize,
      quantity: quantity,
      discount: product.discount
    }
    addToCart(dispatch, item)
      toast({
        title: "Added",
        description: `${product.name} added to your cart`,
        action: (<><Link href={"/cart"}><Button>View cart</Button></Link><ToastAction altText="dismiss">Dismiss</ToastAction></>),
      })
  }

  return (

    <div className="grid md:grid-cols-2 md:gap-x-8 md:items-start">
      <ImageGallery images={product.images} />
      {/* Product info */}
      <div className="px-4 sm:px-0">
        <h1 className={`${integralCF.className} text-4xl font-bold tracking-tight`}>{product.name}</h1>
        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>
          <div className="flex items-center">
            <Rating rating={product.rating} number={true} />
            <p className="sr-only">{product.rating} out of 5 stars</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="sr-only">Description</h3>
          <p className="text-base text-gray-900">{product.description}</p>
        </div>
        <ProductPrice price={product.price} discount={product.discount} pdp={true} />
        <div className="mt-3">
          <h3 className="text-sm text-gray-500">Select Color</h3>
          <div className="mt-3 flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.toString()}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ${selectedColor === color ? "ring-black" : "ring-transparent hover:ring-gray-300"}`}
                style={{ backgroundColor: color.toString() }}
                aria-label={color.toString()}
              >
                <span className="sr-only">{color}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm text-gray-500">choose size</h3>
          <div className="mt-2 flex items-center space-x-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded-full text-sm font-medium ${size === selectedSize
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-10">
          <div className="flex items-center bg-gray-200 border rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center border-r"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center border-l"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            className={"flex-1 py-3 bg-black text-white active:border-black border-2 rounded-full hover:bg-gray-900 transition-colors"}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}