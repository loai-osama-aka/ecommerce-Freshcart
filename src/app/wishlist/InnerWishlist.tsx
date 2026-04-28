/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cartContext } from "@/Contexts/CartContext";
import { wishListContext } from "@/Contexts/WishlistContext";
import { WishlistProduct } from "@/interfaces/wishlist/WishlistProduct ";
import apiServices from "@/services/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function InnerWishlist({
  item,
  onRemove,
}: {
  item: WishlistProduct;
  onRemove: (id: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddCart, setIsLoadingAddCart] = useState(false);
  const { setWishlistIds } = useContext(wishListContext);
  const { setCartCount } = useContext(cartContext);

  async function handleAddToCart(productId: string) {
    setIsLoadingAddCart(true);

    try {
      const response = await apiServices.addProductToCart(productId);

      // ✅ update navbar cart count
      setCartCount(response.numOfCartItems);

      toast.success(response.message);
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoadingAddCart(false);
    }
  }

  async function handleRemoveWishlist(productId: string) {
    setIsLoading(true);

    try {
      const response = await apiServices.RemoveToWishlist(productId);
      toast.success(response.message);

      // ✅ remove from UI instantly
      onRemove(productId);
      setWishlistIds((prev:any) => prev.filter((id:string) => id !== productId));
    } catch (err) {
      toast.error("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <div
        key={item._id}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 
            items-center hover:bg-gray-50/50 dark:hover:bg-gray-700/40 transition"
      >
        {/* ===== PRODUCT ===== */}
        <div className="md:col-span-6 flex items-center gap-4">
          <Link
            href={`/products/${item._id}`}
            className="w-20 h-20 rounded-xl bg-gray-50 dark:bg-gray-700 
                border border-gray-100 dark:border-gray-600 
                overflow-hidden shrink-0"
          >
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-full h-full object-contain p-2"
            />
          </Link>

          <div className="min-w-0">
            <Link
              href={`/products/${item._id}`}
              className="font-medium text-gray-900 dark:text-white 
                  hover:text-emerald-600 transition line-clamp-2"
            >
              {item.title}
            </Link>

            <p className="text-sm text-gray-400 mt-1">{item.category.name}</p>
          </div>
        </div>

        {/* ===== PRICE ===== */}
        <div className="md:col-span-2 flex md:justify-center items-center gap-2">
          <span className="md:hidden text-sm text-gray-500 dark:text-gray-400">
            Price:
          </span>

          <div className="font-semibold text-gray-900 dark:text-white">
            {item.price} EGP
          </div>
        </div>

        {/* ===== STATUS ===== */}
        <div className="md:col-span-2 flex md:justify-center">
          <span className="md:hidden text-sm text-gray-500 dark:text-gray-400 mr-2">
            Status:
          </span>

          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                bg-green-50 dark:bg-green-900/30 
                text-green-700 dark:text-green-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            {item.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
          {/* Add to Cart */}
          <button
            onClick={() => handleAddToCart(item._id)}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 
  px-4 py-2.5 rounded-lg text-sm font-medium  shrink-0
  bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            {isLoadingAddCart ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <>
                <FaCartShopping className="text-xs" />
                <span className="md:hidden  lg:inline">Add to Cart</span>
              </>
            )}
          </button>

          {/* Remove */}
          <button
            onClick={() => {
              handleRemoveWishlist(item._id);
            }}
            className="w-10 h-10 rounded-lg border 
                border-gray-200 dark:border-gray-600
                flex items-center justify-center  shrink-0
                text-gray-400 hover:text-red-500 
                hover:border-red-200 hover:bg-red-50 
                dark:hover:bg-red-900/20 transition"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <FaTrash className="text-sm" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
