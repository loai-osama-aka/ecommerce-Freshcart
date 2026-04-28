import SpecificCategory from "@/components/ui/Category/SpecificCategory";
import SubCategoryCard from "@/components/ui/Category/SubCategoryCard";
import { Category } from "@/interfaces/Category";
import { Subcategory } from "@/interfaces/Subcategory";
import apiServices from "@/services/api";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = await params.then((res) => res.categoryId);
  const specificCategory: Category =
    await apiServices.getSpecificCategory(categoryId);
  console.log(specificCategory);

  const subCategory = await apiServices.getSubCategory();
  console.log(subCategory, "subcategory");

  return (
    <div>
      <SpecificCategory specificCategory={specificCategory} />

      <section className="py-7 px-4 dark:bg-gray-900 bg-white">
        <div className="container mx-auto">
          <Link
            href={"/categories"}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-100  dark:hover:text-green-500 hover:text-green-600 transition-colors mb-6"
          >
            <FaArrowLeft /> Back to categories
          </Link>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {subCategory.length} Subcategories in Music
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 ">
            {subCategory.map((subcategory) => (
              <SubCategoryCard
                key={subcategory._id}
                subcategory={subcategory}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
