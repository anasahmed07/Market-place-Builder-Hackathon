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

export interface Discount {
  amount: number;
  percentage: number;
};

export interface detailedProductData {
  slug: string
  name: string
  price: number
  discount: number
  rating: number
  description: string
  colors: string[]
  sizes: string[]
  images: string[]
  reviews: Review[]
}

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


export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'UPDATE_QUANTITY'; payload: CartItem }
  | { type: 'CLEAR_CART' }  