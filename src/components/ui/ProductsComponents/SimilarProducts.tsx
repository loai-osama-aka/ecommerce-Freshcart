"use client";

import { Product } from "@/interfaces/Product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import apiServices from "../../../services/api";
import ProductCard from "./ProductCard";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function SimilarProducts({ product }: { product: Product }) {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 5;

  const handleNext = () => {
    if (currentIndex < similarProducts.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  async function getSimilar() {
    const allProducts = await apiServices.getProducts();

    const filtered = allProducts
      .filter(
        (p) =>
          p.category?._id === product?.category?._id && p._id !== product._id,
      )
      .slice(0, 9);

    console.log("Filtered:", filtered);

    setSimilarProducts(filtered);
  }

  useEffect(() => {
    getSimilar();
    if (product?.category?._id) {
    }
  }, [product]);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            You May Also <span className="text-green-600">Like</span>
          </h2>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {similarProducts.map((item) => (
              <div key={item._id} className="w-1/5 shrink-0 p-2">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
