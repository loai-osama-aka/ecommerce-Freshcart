import { Address } from "../Address/Address";
import { CartProduct } from "../cart/CartProduct";
import { User } from "./User";

export interface Order {
  _id: string;
  id: number;
  user: User;
  shippingAddress: Address;
  cartItems: CartProduct[];
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'cash' | 'card';
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
