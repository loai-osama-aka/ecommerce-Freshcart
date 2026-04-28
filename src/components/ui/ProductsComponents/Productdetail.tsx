/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@/interfaces/Product";
import Link from "next/link";
import React, { useContext, useState } from "react";
import {
  FaStar,
  FaRegHeart,
  FaShareAlt,
  FaShoppingCart,
  FaBolt,
  FaMinus,
  FaPlus,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
} from "react-icons/fa";
import SimilarProducts from "./SimilarProducts";
import apiServices from "@/services/api";

import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cartContext } from "@/Contexts/CartContext";
import { useSession } from "next-auth/react";
import { wishListContext } from "@/Contexts/WishlistContext";

export default function ProductDetail({ product }: { product: Product }) {
  const images = [product?.imageCover, ...product.images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingwishlist, setIsLoadingwishlist] = useState(false);
  const [qty, setQty] = useState(1);
  const { setCartCount } = useContext(cartContext);
  const { wishlistIds, setWishlistIds, setWishlistCount } =
    useContext(wishListContext);
  const isAddedToWishlist = wishlistIds.includes(product._id);

  const session = useSession();

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // add and remove from wishlist
  async function toggleWishlist(productId: string) {
    if (session.status === "unauthenticated") {
      return toast.error("You should login first");
    }

    setIsLoadingwishlist(true);

    try {
      if (wishlistIds.includes(productId)) {
        //  REMOVE  from wishlist
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
      setIsLoadingwishlist(false);
    }
  }
  // add to cart
  async function addToCart() {
    setIsLoading(true);
    if (session.status == "unauthenticated") {
      setIsLoading(false);
      return toast.error("you should login first before adding to the cart");
    }
    const response = await apiServices.addProductToCart(product._id);
    toast.success(response.message);
    setCartCount(response.numOfCartItems);
    setIsLoading(false);
    console.log(response);
  }

  return (
    <>
      <div className=" p-4 md:p-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href={"/products"}>Home</Link>
          <span className="mx-1">{">"}</span>
          <Link href={`/category/${product.category._id}`}>
            {product.category?.name}
          </Link>
          <span className="mx-1">{">"}</span>
          <span className="text-green-600">{product.subcategory[0].name}</span>
          <span className="mx-1">{">"}</span>
          <span className="text-green-600">{product.title}</span>
        </div>

        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 🖼️ IMAGES */}
              <div className="lg:w-1/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sticky top-4">
                  {/* Gallery */}
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative w-full h-100 overflow-hidden rounded-lg group border border-gray-200 dark:border-gray-700">
                      <img
                        src={images[currentIndex]}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />

                      {/* Arrows */}
                      <button
                        onClick={prevImage}
                        className="absolute opacity-0 group-hover:opacity-100 left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-700 shadow"
                      >
                        <FaChevronLeft />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute opacity-0 group-hover:opacity-100 right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-700 shadow"
                      >
                        <FaChevronRight />
                      </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-20 h-20 cursor-pointer border rounded-md overflow-hidden
                      ${
                        currentIndex === index
                          ? "border-green-500 dark:border-2"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                        >
                          <img
                            src={img}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 📦 PRODUCT INFO */}
              <div className="lg:w-2/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  {/* Category + Brand */}
                  <div className="flex gap-2 mb-4">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      {product.category.name}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-xs px-3 py-1 rounded-full">
                      {product.brand.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl font-bold mb-3">
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.ratingsAverage} ({product.ratingsQuantity})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      {product.priceAfterDiscount || product.price} EGP
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="mb-6 flex justify-between">
                    <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                      In Stock
                    </span>
                    <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                      Quantity: {product.quantity}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {product.description}
                  </p>

                  {/* Quantity */}
                  <div className="mb-6">
                    <p className="mb-2 font-medium">Quantity</p>
                    <div className="flex items-center gap-4">
                      <div className="flex border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="px-4 cursor-pointer  py-2"
                        >
                          <FaMinus />
                        </button>
                        <span className="px-4  py-2">{qty}</span>
                        <button
                          onClick={() => setQty((q) => q + 1)}
                          className="px-4 cursor-pointer py-2"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-6 flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold">
                      {(product.price * qty).toFixed(2)} EGP
                    </span>
                  </div>

                  {/* Buttons */}

                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                      onClick={addToCart}
                      disabled={isLoading}
                      className="flex-1 cursor-pointer bg-green-600 disabled:bg-green-300 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FaShoppingCart />
                      )}
                      Add to Cart
                    </button>
                    <Link
                      href={"/checkout"}
                      className=" flex-1 cursor-pointer bg-gray-900 hover:bg-gray-950 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <button
                        onClick={addToCart}
                        disabled={isLoading}
                        className=" flex items-center justify-center gap-3"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <FaBolt /> <span>Buy Now</span>
                          </>
                        )}
                      </button>
                    </Link>
                  </div>

                  {/* Wishlist + Share */}
                  <div className="flex gap-3 mb-6">
                    {isAddedToWishlist ? (
                      <button
                        onClick={() => {
                          toggleWishlist(product._id);
                        }}
                        className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-red-200 text-red-600 bg-red-50"
                      >
                        {isLoadingwishlist ? (
                          <Loader2 className="text-red-500 size-5 animate-spin" />
                        ) : (
                          <FaHeart className="size-5 text-red-500" />
                        )}
                        In Wishlist
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toggleWishlist(product._id);
                        }}
                        className="flex-1 hover:border-green-500 hover:text-green-400 border py-3 rounded-xl flex items-center justify-center gap-2"
                      >
                        <FaRegHeart /> Wishlist
                      </button>
                    )}
                    <button className="border px-4 rounded-xl flex items-center   hover:border-green-500 hover:text-green-400 justify-center">
                      <FaShareAlt />
                    </button>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-6">
                    <div className="flex  items-center gap-3">
                      <FaTruck className="bg-green-200 w-10 h-10 p-2 text-green-800 rounded-xl" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-50 text-sm">
                          Free Delivery
                        </h4>
                        <p className="text-xs text-gray-500">
                          Orders over 500 EGP
                        </p>
                      </div>
                    </div>

                    <div className="flex  items-center gap-3">
                      <FaUndo className="bg-green-200 w-10 h-10 p-2 text-green-800 rounded-xl" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-50  text-sm">
                          30 Days Return
                        </h4>
                        <p className="text-xs text-gray-500">Money back</p>
                      </div>
                    </div>

                    <div className="flex  items-center gap-3">
                      <FaShieldAlt className="bg-green-200 w-10 h-10 p-2 text-green-800 rounded-xl" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-50 text-sm">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-gray-500">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <SimilarProducts product={product} />
      </div>
    </>
  );
}
