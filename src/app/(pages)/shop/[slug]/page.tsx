'use client'

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation';
import { integralCF } from "@/styles/fonts";
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { TypeProduct, Review, detailedProductData } from '@/lib/types'
import { fetchProductBySlug, fetchproducts } from '@/lib/utils'
import ReviewCard from '@/components/review'
import ProductCardGroup from '@/components/productCardGroup'
import ProductPrice from '@/components/productPrice'
import Rating from '@/components/rating';
import ProductDetailSkeleton from './loading';

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<detailedProductData | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [mainImage, setMainImage] = useState<string>('')
  const [relatedProducts, setRelatedProducts] = useState<TypeProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPageData = async () => {
      const data = await fetchProductBySlug((await params).slug)
      setProduct(data)
      if (data) {
        setSelectedColor(data.colors[0])
        setSelectedSize(data.sizes[2])
        setMainImage(data.images[0])
      }
      setIsLoading(false)
    }
    getPageData()
  }, [params])

  useEffect(() => {
    const getRelatedProducts = async () => {
      const relatedProducts: TypeProduct[] = await fetchproducts('recommended')
      setRelatedProducts(relatedProducts)
    }
    getRelatedProducts()
  }, [])

  if (isLoading) {
    return <ProductDetailSkeleton/>
  }

  if (!product) {
    notFound()
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
        <div className="grid grid-rows-4 sm:grid-rows-none sm:grid-cols-4 gap-6">
          <div className="col-span-1 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="row-span-1 grid grid-rows-3 gap-6" aria-orientation="vertical" role="tablist">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer active:border-black"
                  onClick={() => setMainImage(image)}
                >
                  <span className="sr-only">Image {index + 1}</span>
                  <span className="absolute inset-0 rounded-md overflow-hidden">
                    <Image src={image} alt="" className="w-full h-full object-center object-cover" width={60} height={60} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-3 w-full bg aspect-w-1 aspect-h-1">
            <Image
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-center object-cover sm:rounded-lg"
              width={600}
              height={600}
            />
          </div>
        </div>
        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
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

          <div className="mt-6">
            <h3 className="text-sm text-gray-500">select color</h3>
            <div className="mt-2 flex items-center space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    color === selectedColor ? 'ring-4 ring-black' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
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

          <div className="mt-10 flex flex-row justify-between my-auto">
            <div className="flex max-w-xs my-auto bg-gray-200 active:border h-10 rounded-full">
              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-5 w-5" />
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="text-center w-10 text-lg bg-gray-200 active:border-none sm:text-sm"
              />
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <button
              type="submit"
              className="duration-500 hover:border-black border-4 mt-6 w-full bg-black rounded-full active:py-2 active:mx-8 py-3 px-8 flex items-center justify-center text-base font-medium text-white sm:mt-0 sm:ml-4"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Product details, reviews, and FAQs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex justify-evenly" aria-label="Tabs">
            {["Product Details", "Ratings and Reviews", "FAQ's"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-black  text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap w-full py-4 px-1 border-b-2 font-medium text-lg`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'details' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
              <p className="mt-4 text-gray-500">
                {/* {product.details} */}
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
              <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {product.reviews.map((review:Review) => (
                  <ReviewCard key={review.author} customerReview={review} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
              <p className="mt-4 text-gray-500">
                {/* {product.faqs} */}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <ProductCardGroup products={relatedProducts} title="You Might Also Like" />
    </div>
  )
}