import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { detailedProductData, TypeProduct } from "./types"
import { client } from '@/sanity/lib/client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function fetchproducts(tag?: string): Promise<TypeProduct[]> {
  let productQuery = [`*[_type == "product"]{
    "slug": slug.current,
    name,
    price,
    rating,
    discount,
    "image": images[0].asset->url,
    "category": category->name
  }`,
    `*[_type == "product" && "${tag}" in tag][0...4]{
    "slug": slug.current,
    name,
    price,
    rating,
    discount,
    "image": images[0].asset->url,
    "category": category->name
  }`][tag ? 1 : 0]

  const res = await client.fetch(productQuery)
  const data = await res
  return data
}


export async function fetchProductBySlug(slug: string): Promise<detailedProductData> {
  let productQuery = `*[_type == "product" && slug.current == "${slug}"][0] {
  name,
  "slug": slug.current,
  price,
  discount,
  "category": category->name,
  dressStyle,
  tag,
  description,
  "images": coalesce(images[].asset->url, []),
  "sizes": coalesce(sizes, []),
  "colors": coalesce(colors, []),
  rating,
  "reviews": coalesce(reviews[]->{
    _id,
    rating,
    comment,
    "author": author->name
  }, [])
}`

  const res = await client.fetch(productQuery)
  const data = await res
  return data
}