import { Brand } from "@/interfaces/Brand";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";



export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
    // 
      href={`/products?brand=${brand._id}`}
      className="group bg-white  rounded-2xl 
      border border-gray-100  
      p-4 sm:p-5 shadow-sm hover:shadow-xl 
      hover:border-violet-400 
      transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div
        className="aspect-square rounded-xl overflow-hidden 
        bg-gray-200 mb-3 p-4 
        flex items-center justify-center"
      >
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-full object-contain 
          group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Name */}
      <h3
        className="font-semibold text-gray-900  
        text-center text-sm truncate
        group-hover:text-violet-600 transition-colors"
      >
        {brand.name}
      </h3>

      {/* Hover Action */}
      <div
        className="flex justify-center mt-1.5 opacity-0 
        group-hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-xs text-violet-600 flex items-center gap-1">
          View Products
          <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}