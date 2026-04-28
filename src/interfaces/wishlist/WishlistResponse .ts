import { WishlistProduct } from "./WishlistProduct ";

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}