import BrandCard from "@/components/ui/Brands/BrandCard";
import BrandsHeader from "@/components/ui/Brands/BrandsHeader";
import { Brand } from "@/interfaces/Brand";
import apiServices from "@/services/api";
import React from "react";

export default async function Brands() {
  const brands = await apiServices.getBrands();
  console.log(brands);

  return (
    <>
      <BrandsHeader />
      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-10">
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
        gap-4 sm:gap-5"
          >
            {brands.map((brand: Brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
