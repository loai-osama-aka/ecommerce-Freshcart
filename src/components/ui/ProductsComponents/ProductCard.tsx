/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaHeart, FaPlus, FaRegEye, FaRegHeart } from "react-icons/fa";
import { Product } from "@/interfaces/Product";
import Link from "next/link";
import { renderStars } from "@/helpers/renderStars";
import { formatPrice } from "@/lib/utils";
import apiServices from "@/services/api";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { cartContext } from "@/Contexts/CartContext";
import { useSession } from "next-auth/react";
import { wishListContext } from "@/Contexts/WishlistContext";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCartCount } = useContext(cartContext);
  const { wishlistIds, setWishlistIds, setWishlistCount } =
    useContext(wishListContext);

  const isAddedToWishlist = wishlistIds.includes(product._id);
  const session = useSession();

  async function toggleWishlist(productId: string) {
    if (session.status === "unauthenticated") {
      return toast.error("You should login first");
    }

    setIsLoading(true);

    try {
      if (wishlistIds.includes(productId)) {
        // ✅ REMOVE  from wishlist
        const res = await apiServices.RemoveToWishlist(productId);
        setWishlistIds((prev:any) => prev.filter((id:string) => id !== productId));
        toast.success(res.message);

        const wishlistCount = await apiServices.getWishlist();
        setWishlistCount(wishlistCount.count);
      } else {
        //  ADD to wishlist
        const res = await apiServices.AddToWishlist(productId);
        setWishlistIds((prev:any) => [...prev, productId]);
        toast.success(res.message);
        const wishlistCount = await apiServices.getWishlist();
        setWishlistCount(wishlistCount.count);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  //   handle add to cart
  async function handleAddProduct(productId: string) {
    if (session.status == "unauthenticated") {
      setIsLoading(false);
      return toast.error("you should login first before adding to the cart");
    }
    setIsLoading(true);
    const response = await apiServices.addProductToCart(productId);

    setCartCount(response.numOfCartItems);
    toast.success(response.message);
    setIsLoading(false);
  }

  // discount percentage
  function discountPercentage(product: Product) {
    const discount =
      ((product.price - product?.priceAfterDiscount) / product.price) * 100;
    return discount.toFixed(2);
  }
  return (
    <div className="m-5">
      <div className="max-w-2xl mx-auto">
        <div
          className="relative mx-auto max-w-sm rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
                    bg-white text-gray-900 
                    dark:bg-gray-800 dark:text-gray-100 dark:border dark:border-gray-700"
        >
          {/* IMAGE */}
          <div className="relative aspect-square  rounded-t-lg overflow-hidden mb-3">
            <Image
              src={product.imageCover}
              alt={product.title}
              sizes="(max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      (max-width: 1280px) 33vw,
                      25vw"
              fill
              className="object-contain transition-all duration-300 hover:scale-110"
            />

            {product.priceAfterDiscount > 0 && (
              <span className="absolute top-14 left-5 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {discountPercentage(product)}%
              </span>
            )}

            {/* POPULAR */}
            {product.sold != null && product.sold > 100 && (
              <div
                className="absolute top-5 left-5 text-sm px-2 py-1 rounded
                        bg-slate-900 text-white 
                          "
              >
                Popular
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="absolute top-4 right-3 flex flex-col space-y-2">
              {/* Wishlist */}
              <button
                disabled={isLoading}
                onClick={() => toggleWishlist(product._id)}
                className="h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition
                            bg-white text-gray-600 hover:text-red-500
                            dark:bg-gray-700 disabled:bg-gray-50 dark:disabled:bg-gray-50 dark:text-gray-200 dark:hover:text-red-400"
                title="Add to wishlist"
              >
                {isAddedToWishlist ? (
                  isLoading ? (
                    <Loader className="animate-spin text-red-500" />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )
                ) : isLoading ? (
                  <Loader className="animate-spin text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>

              {/* View product detials */}
              <Link
                href={`/products/${product.id}`}
                title="View details"
                className="h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition
                            bg-white text-gray-600 hover:text-green-500
                            dark:bg-gray-700 dark:text-gray-200 dark:hover:text-green-400"
              >
                <FaRegEye />
              </Link>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-4 pb-4">
            {/* BRAND */}
            <p
              className="text-sm mb-1 block
          text-gray-500 
          dark:text-gray-300 "
            >
              {product.brand.name}
            </p>

            {/* TITLE */}
            <Link href={`/products/${product.id}`}>
              <h3
                className="font-medium mb-1 line-clamp-2 min-h-12 cursor-pointer
          text-gray-800 hover:text-green-600
          dark:text-gray-100 dark:hover:text-green-400"
              >
                {product.title}
              </h3>
            </Link>

            {/* CATEGORY */}
            <Link
              href={`/categories/${product.category._id}`}
              className="text-sm mb-1 block
          text-gray-500 hover:text-gray-700
          dark:text-gray-300 dark:hover:text-white"
            >
              {product.category.name}
            </Link>

            {/* RATING */}
            <div className="flex items-center mt-2.5 mb-5">
              {renderStars(product.ratingsAverage)}

              <span
                className="ml-3 text-xs font-semibold px-2.5 py-0.5 rounded
          bg-blue-100 text-blue-800
          dark:bg-blue-900 dark:text-blue-200"
              >
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>

            {/* SOLD */}
            <span
              className="flex justify-end mb-3 text-sm
        text-gray-500 dark:text-gray-400"
            >
              {product.sold === null
                ? 0
                : product.sold > 1000
                  ? "1000+"
                  : product.sold}{" "}
              sold
            </span>

            {/* PRICE + BUTTON */}
            <div className="flex items-center justify-between">
              {product.priceAfterDiscount ? (
                <div>
                  <span className="shrink-0 text-lg font-bold text-green-600 dark:text-green-400">
                    {formatPrice(product.priceAfterDiscount)}
                  </span>
                  <span
                    className="text-sm line-through 
              text-gray-500 dark:text-gray-400"
                  >
                    {formatPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span
                  className="text-2xl font-bold
            text-gray-900 dark:text-white"
                >
                  {formatPrice(product.price)}
                </span>
              )}

              {/* ADD BUTTON */}
              <Button
                onClick={() => handleAddProduct(product._id)}
                className="h-10 w-10 rounded-full flex items-center justify-center transition
            bg-green-600 text-white hover:bg-green-700
            dark:bg-green-500 dark:hover:bg-green-600"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPlus />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
