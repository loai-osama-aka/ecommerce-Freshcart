import { Brand } from "@/interfaces/Brand";
import { Category } from "@/interfaces/Category";
import Link from "next/link";
import { FaFilter, FaTags, FaTimes } from "react-icons/fa";



export default function ActiveFilters({
  params,
  categoryData,
  brandData,
}: {
  params: {
    brand?: string;
    category?: string;
    subcategory?: string;
  };
  categoryData: Category|null,
  brandData:Brand|null
}) {
  const hasFilters = params.brand || params.category;

  if (!hasFilters) return null;

  return (
    <div className="mb-6 flex items-center gap-3 flex-wrap">

      {/* Label */}
      <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <FaFilter />
        Active Filters:
      </span>

      {/* BRAND */}
      {params.brand && (
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
          bg-violet-100 text-violet-700 text-sm font-medium 
          hover:bg-violet-200 transition"
        >
          <FaTags className="text-xs" />
          {brandData?.name}
          <FaTimes className="text-xs" />
        </Link>
      )}

      {/* CATEGORY */}
      {params.category && (
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
          bg-emerald-100 text-emerald-700 text-sm font-medium 
          hover:bg-emerald-200 transition"
        >
          <FaTags className="text-xs" />
          {categoryData?.name}
          <FaTimes className="text-xs" />
        </Link>
      )}

      {/* CLEAR ALL */}
      <Link
        href="/products"
        className="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Clear all
      </Link>

    </div>
  );
}