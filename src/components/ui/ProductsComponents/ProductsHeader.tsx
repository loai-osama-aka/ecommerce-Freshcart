import { FaHome, FaChevronRight, FaBoxOpen } from "react-icons/fa";

import Link from "next/link";
import { Category } from "@/interfaces/Category";
import { Brand } from "@/interfaces/Brand";
import { Subcategory } from "@/interfaces/Subcategory";

function ProductsHeader({
  params,
  categoryData,
  brandData,
}: {
  params: {
    brand?: string;
    category?: string;
    subcategory?: string;
  };
  categoryData: Category|null;
  brandData: Brand|null;
  

}) {
  return (
    <div className="bg-linear-to-br from-emerald-600 via-green-500 to-lime-400 text-white rounded-b-3xl shadow-lg">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/80 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white flex items-center gap-1">
            <FaHome />
            Home
          </Link>

          <FaChevronRight className="text-white/40 text-xs" />

          <Link href="/products" className="hover:text-white">
            Products
          </Link>

          {params.category && (
            <>
              <FaChevronRight className="text-white/40 text-xs" />
              <span className="text-white font-medium capitalize">
                {categoryData?.name}
              </span>
            </>
          )}

          {params.brand && (
            <>
              <FaChevronRight className="text-white/40 text-xs" />
              <span className="text-white font-medium capitalize">
                {brandData?.name}
              </span>
            </>
          )}
        </nav>

        {/* Header Content */}
        <div className="flex items-center gap-5">
          {/* Icon Box */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            {params.category ? (
              <>
                <img
                  src={categoryData?.image}
                  alt={categoryData?.name}
                  className="w-10 h-10 object-contain"
                />
              </>
            ) : params.brand ? (
              <>
                <img
                  src={brandData?.image}
                  alt={brandData?.name}
                  className="w-10 h-10 object-contain"
                />
              </>
            ) : (
              <FaBoxOpen className="size-10" />
            )}
          </div>

          {/* Text */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {params.brand
                ? "Brand Products"
                : params.category
                  ? `${categoryData?.name}`
                  : "All Products"}
            </h1>

            <p className="text-white/80 mt-1">
              {params.brand
                ? `Browse products from this brand ${brandData?.name}`
                : params.category
                  ? `Browse products in ${categoryData?.name}`
                  : "Discover all available products"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsHeader;
