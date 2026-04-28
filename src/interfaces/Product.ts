import { Brand } from "./Brand";
import {  } from "./Category";
import { Subcategory } from "./Subcategory";
import { Category } from '@/interfaces/Category';

export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;

    images: string[];
    imageCover: string;

    category: Category;
    subcategory: Subcategory[];
    brand: Brand;

    price: number;
    quantity: number;
    priceAfterDiscount: number;
    sold: number | null;

    ratingsAverage: number;
    ratingsQuantity: number;

    createdAt: string;
    updatedAt: string;

    id: string;
}

