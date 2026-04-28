import { Brand } from "../Brand";
import { Category } from "../Category";
import { Subcategory } from "../Subcategory";

export interface WishlistProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;

  price: number;
  quantity: number;
  sold: number;

  imageCover: string;
  images: string[];

  ratingsAverage: number;
  ratingsQuantity: number;

  category: Category;
  brand: Brand;
  subcategory: Subcategory[];

  createdAt: string;
  updatedAt: string;

  __v: number;
}