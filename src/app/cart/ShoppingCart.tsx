/* eslint-disable react/no-unescaped-entities */
"use client";

import { Loader2, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddToCartResponse } from "@/interfaces/cart/AddToCartResponse";
import { formatPrice } from "@/lib/utils";
import apiServices from "@/services/api";
import toast from "react-hot-toast";
import ProductCart from "./ProductCart";
import EmptyCart from "./EmptyCart";
import { FaBagShopping } from "react-icons/fa6";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { cartContext } from "@/Contexts/CartContext";
import Link from "next/link";

const ShoppingCart = ({ cart }: { cart: AddToCartResponse }) => {
  const [innerCart, setinnerCart] = useState<AddToCartResponse>(cart);
  const [isClearing, setIsClearing] = useState(false);
  const { cartCount, setCartCount } = useContext(cartContext);

  useEffect(() => {
    setCartCount(innerCart.numOfCartItems);
  }, [innerCart]);

  const removeItem = async (productId: string) => {
    const remove = await apiServices.removeProductFromCart(productId);
    toast.success(remove.message);
    setinnerCart(remove);
  };

  async function updateProductCount(productId: string, count: number) {
    const res = await apiServices.updateProductCount(productId, count);
    toast.success(res.message);
    setinnerCart(res);
  }

  async function clearCart() {
    setIsClearing(true);
    const data = await apiServices.clearUserCart();
    setIsClearing(false);
    console.log(data, "data from shopping cart");
    toast.success(data.message);
    setinnerCart(data);
  }

  // const subtotal = items.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0,
  // );
  // const shipping = 9.99;
  // const total = subtotal + shipping;

  if (innerCart?.numOfCartItems === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="m-6 md:m-10">
      <div className="container mx-auto">
        {/* Title */}
        <div className="flex gap-3 mb-3 ">
          <div className="w-10 h-10 bg-linear-to-r mt-2 from-green-600 to-green-500 rounded-xl flex items-center justify-center">
            <FaShoppingCart size={24} />
          </div>
          <div>
            <h1 className="text-3xl mb-2 font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="dark:text-gray-400 text-gray-600 ">
              {innerCart.numOfCartItems} items in your cart
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/*  Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {innerCart.data.products.map((item) => (
              <ProductCart
                key={item.product._id}
                updateProductCount={updateProductCount}
                item={item}
                removeItem={removeItem}
              />
            ))}
          </div>

          {/*  Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-900 
                        shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div
                className="p-4 rounded-t-2xl 
                          bg-linear-to-r from-green-600 to-green-500"
              >
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <FaBagShopping /> Order Summary
                </h2>
              </div>

              {/* Content */}
              <div className="space-y-4 p-6 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>
                    {innerCart.numOfCartItems}{" "}
                    {innerCart.numOfCartItems === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="font-medium">
                    {formatPrice(innerCart.data.totalCartPrice)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <Separator className="bg-gray-400" />

                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">
                    {formatPrice(innerCart.data.totalCartPrice)}
                  </span>
                </div>

                {/* Button */}
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="w-full mb-4 rounded-xl bg-green-600 hover:bg-green-700 transition"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-center text-xs text-gray-400">
                  Taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={clearCart}
        disabled={isClearing}
        className="p-5 bg-red-600 m-5 disabled:bg-red-300 hover:bg-red-700"
      >
        {" "}
        {isClearing ? <Loader2 className="animate-spin" /> : <FaTrash />} Clear
        Cart Items
      </Button>
    </section>
  );
};

export { ShoppingCart };
