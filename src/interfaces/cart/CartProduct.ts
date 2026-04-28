import { Brand } from "../Brand";
import { Category } from "../Category";
import { Subcategory } from "../Subcategory";

export interface CartProduct {
  count: number;
  _id: string;
  product: ProductItem; 
  price: number;
}


 interface ProductItem {
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsAverage: number;
  id: string;
}