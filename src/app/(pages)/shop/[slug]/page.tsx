'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation';
import { integralCF } from "@/styles/fonts";
import { Minus, Plus } from 'lucide-react'
import { TypeProduct, detailedProductData, CartItem, CartAction } from '@/lib/types'
import { fetchProductBySlug, fetchproducts } from '@/lib/utils'
import ProductCardGroup from '@/components/productCardGroup'
import ProductPrice from '@/components/productPrice'
import Rating from '@/components/rating';
import ProductDetailSkeleton from './loading';
import ProductDetailPageTabs from '@/components/productDetailPageTabs';
// import { useCart } from '../../../../../context/CartContext';

// const addToCart = (dispatch: React.Dispatch<CartAction>, item: CartItem) => {
//   dispatch({ type: 'ADD_TO_CART', payload: item })
// }

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<detailedProductData | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState<string>('')
  const [relatedProducts, setRelatedProducts] = useState<TypeProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // const { dispatch, state } = useCart()

  useEffect(() => {
    const getPageData = async () => {
      const data = await fetchProductBySlug((await params).slug)
      setProduct(data)
      if (data) {
        setSelectedColor(data.colors[0])
        setSelectedSize(data.sizes[0])
        setMainImage(data.images[0])
      }
      setIsLoading(false)
    }
    getPageData()
  }, [params])

  useEffect(() => {
    const getRelatedProducts = async () => {
      const relatedProducts: TypeProduct[] = await fetchproducts()
      setRelatedProducts(relatedProducts.sort(() => 0.5 - Math.random()).slice(0,4))
    }
    getRelatedProducts()
  }, [])

  if (isLoading) {
    return <ProductDetailSkeleton/>
  }

  if (!product) {
    notFound()
  }

  function handleAddToCart() {
    
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-10">
      <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center md:space-x-3">
          <li><Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
          <li><span className="text-gray-300 mx-1">&gt;</span></li>
          <li><Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link></li>
          <li><span className="text-gray-300 mx-1">&gt;</span></li>
          <li><Link href={`/shop/${product.slug}`} className="text-gray-500 hover:text-gray-700">{product.name}</Link></li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 md:gap-x-8 md:items-start">
        {/* Image gallery */}
        <div className="mx-7 grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 aspect-square lg:hidden row-span-3 w-full max-h-[60vh]">
            <Image
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-center object-cover rounded-lg"
              width={1200}
              height={1200}
              priority={true}
            />
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-1 lg:grid-rows-4 w-full max-w-2xl mx-auto row-span-1 gap-2 my-px md:gap-6" aria-orientation="vertical" role="tablist">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`aspect-square col-span-1 row-span-1 sm:max-w-48 sm:max-h-48 bg-gray-100 rounded-lg overflow-hidden ${mainImage === image && "ring-2 ring-black"}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover"
                  />
                </button>
            ))}
          </div>
          <div className="lg:col-span-3 aspect-square hidden lg:block row-span-3 w-full max-h-[60vh]">
            <Image
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-center object-cover rounded-lg"
              width={1200}
              height={1200}
              
            />
          </div>
        </div>
        {/* Product info */}
        <div className="px-4 sm:px-0">
          <h1 className={`${integralCF.className} text-4xl font-bold tracking-tight`}>{product.name}</h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <div className="flex items-center">
              <Rating rating={product.rating} number={true}/>
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
                  className={`px-4 py-2 border rounded-full text-sm font-medium ${
                    size === selectedSize
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
                onClick={() => setQuantity( quantity + 1)}
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
          `</div>
        </div>
      </div>

      {/* Product details, reviews, and FAQs */}
      <ProductDetailPageTabs/>

      {/* Related products */}
      <ProductCardGroup products={relatedProducts} title="You Might Also Like" />
    </div>
  )
}