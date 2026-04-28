import { Category } from "@/interfaces/Category";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CategoryCard({ category }: {category:Category}) {
  
  
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 
      p-4 sm:p-6 shadow-sm hover:shadow-xl 
      hover:border-emerald-200 dark:hover:border-emerald-500 
      transition-all duration-300 hover:-translate-y-1 block"
    >
      {/* Image */}
      <div className="aspect-square rounded-xl overflow-hidden 
        bg-gray-50 dark:bg-gray-700 mb-4">
        
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover 
          group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="font-bold text-gray-900 dark:text-white text-center 
        group-hover:text-emerald-600 transition-colors">
        {category.name}
      </h3>

      {/* Hover Text */}
      <div className="flex justify-center mt-2 opacity-0 
        group-hover:opacity-100 transition-opacity duration-300">
        
        <span className="text-sm text-emerald-600 flex items-center gap-1">
          View Subcategories
          <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
        </span>

      </div>
    </Link>
  );
}