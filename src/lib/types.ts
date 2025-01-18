import { StaticImageData } from "next/image";

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

export type MenuItem = {
  id: number;
  type: "MenuItem" | "MenuList";
  label: string;
  url?: string;
  children:
    | (Omit<MenuItem, "children" | "type"> & {
        description?: string | React.ReactNode;
      })[]
    | [];
};

export type MenuListData = (Omit<MenuItem, "children" | "type"> & {
  description?: string | React.ReactNode;
})[];

export type NavMenu = MenuItem[];