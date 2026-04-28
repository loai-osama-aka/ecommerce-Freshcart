import apiServices from "@/services/api";
import React from "react";
import Link from "next/link";
import { WishlistResponse } from "@/interfaces/wishlist/WishlistResponse ";
import WishlistClient from "./WishlistClient";

export default async function Page() {
  const wishlist: WishlistResponse = await apiServices.getWishlist();

  return (
    <>
      <div className="bg-white dark:bg-gray-800">
        <div className="container mx-auto my-4 px-4 py-8 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* TABLE HEADER */}
          <div
            className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 
      bg-gray-50 dark:bg-gray-900 
      border-b border-gray-100 dark:border-gray-700 
      text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* CLIENT HANDLES EVERYTHING */}
          <WishlistClient initialData={wishlist.data} />

          {/* FOOTER */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/products"
              className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 text-sm font-medium transition"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
