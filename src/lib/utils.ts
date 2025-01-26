import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartAction, CartItem, detailedProductData, TypeProduct } from "./types"
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
  let productQuery = `*[_type == "product" && slug.current == $slug][0] {
  name,
  "slug": slug.current,
  price,
  discount,
  "category": category[]->name, // Fetching array of category names
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
  }, []),
  "faqs": coalesce(faqs[] {
    question,
    answer
  }, []),
  "productDetails": coalesce(productDetails, [])
}
`

  const res = await client.fetch(productQuery, { slug })
  const data = await res
  return data
}

export const addToCart = (dispatch: React.Dispatch<CartAction>, item: CartItem) => {
  dispatch({ type: 'ADD_TO_CART', payload: item })
}

export const removeFromCart = (dispatch: React.Dispatch<CartAction>, item: Omit<CartItem, 'quantity'>) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: item })
}

export const updateQuantity = (dispatch: React.Dispatch<CartAction>, item: CartItem) => {
  dispatch({ type: 'UPDATE_QUANTITY', payload: item })
}

export const clearCart = (dispatch: React.Dispatch<CartAction>) => {
  dispatch({ type: 'CLEAR_CART' })
}
