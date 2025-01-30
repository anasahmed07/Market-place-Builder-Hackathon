'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation';
import { detailedProductData } from '@/lib/types'
import { fetchProductBySlug } from '@/lib/utils'
import ProductDetailSkeleton from '@/components/pdpComponents/pdpSkeleton';
import ProductDetailPageTabs from '@/components/pdpComponents/Tabs';
import RelatedProducts from '@/components/pdpComponents/relatedProducts';
import ProductDetails from '@/components/pdpComponents/ProductDetails';

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  const [product, setProduct] = useState<detailedProductData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPageData = async () => {
      const data = await fetchProductBySlug((await params).slug)
      setProduct(data)
      if (!data.name) {
        notFound()
      }
      setIsLoading(false)
    }
    getPageData()
  }, [params])

  if (isLoading) {
    return <ProductDetailSkeleton/>
  }
  else if (product) {
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

        <ProductDetails product={product}/>
        <ProductDetailPageTabs faqs={product.faqs} productDetails={product.productDetails} reviews={product.reviews}/>
        <RelatedProducts/>
      </div>
    )
  }
}