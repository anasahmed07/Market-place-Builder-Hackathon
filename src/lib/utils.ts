import { clsx, type ClassValue } from "clsx"
import { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string | StaticImageData;
  size: string;
  color: string;
  quantity: number;
}
export interface TypeProduct {
  slug: string
  name: string
  price: number
  discount?: number
  rating: number
  image: string
  category: string
}

export interface Review {
  author: string
  rating: number
  content: string
  date: string
}

export interface NewTypeProduct {
  id: number
  name: string
  price: number
  oldPrice: number
  discount: number
  rating: number
  reviewCount: number
  description: string
  colors: string[]
  sizes: string[]
  images: string[]
  reviews: Review[]
}
export interface RelatedProduct {
  id: number
  name: string
  price: number
  oldPrice: number
  rating: number
  image: string
}

export interface Discount {
  amount: number;
  percentage: number;
};

export interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
};
