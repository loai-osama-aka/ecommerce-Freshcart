import { FaArrowRight, FaFolderOpen } from "react-icons/fa";
import  Link  from 'next/link';
import { Subcategory } from "@/interfaces/Subcategory";

export default function SubCategoryCard({
  subcategory,
}: {
  subcategory: Subcategory;
}) {
  return (
    <Link
      href={`/products?subcategory=${subcategory._id}`}
      className="group bg-white dark:bg-gray-800 
      rounded-2xl border border-gray-100 dark:border-gray-700 
      p-6 shadow-sm hover:shadow-xl 
      hover:border-emerald-200 dark:hover:border-emerald-500
      transition-all duration-300 hover:-translate-y-1 block"
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl 
        bg-emerald-50 dark:bg-emerald-900/30
        flex items-center justify-center mb-4 
        group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/40
        transition-colors"
      >
        <FaFolderOpen className="text-2xl text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Title */}
      <h3
        className="font-bold text-gray-900 dark:text-white text-lg 
        group-hover:text-emerald-600 transition-colors mb-2"
      >
        {subcategory.name}
      </h3>

      {/* Hover text */}
      <div
        className="flex items-center gap-2 text-sm 
        text-emerald-600 dark:text-emerald-400
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
      >
        <span>Browse Products</span>
        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}