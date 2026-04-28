import apiServices from "@/services/api";

import { ShoppingCart } from "./ShoppingCart";

export default async function Cart() {
  const cartData = await apiServices.getUserCart();
  console.log(cartData, "cartdata");

  return (
    <div
      className=" text-gray-900 
                    dark:bg-gray-800 dark:text-gray-100 dark:border dark:border-gray-700"
    >
      <ShoppingCart cart={cartData} />
    </div>
  );
}
