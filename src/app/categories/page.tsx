import CategoryCard from "@/components/ui/Category/CategoryCard";
import CategoryHeader from "@/components/ui/Category/CategoryHeader";
import { Category } from "@/interfaces/Category";
import apiServices from "@/services/api";
import React from "react";

export default async function CategoryPage() {
  const categories = await apiServices.getCategory();
  console.log(categories);

  return (
    <div>
      <CategoryHeader />

      <div className=" px-4 py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category: Category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
