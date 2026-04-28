import Link from "next/link";
import { FaHeart, FaArrowRight } from "react-icons/fa";

export default function EmptyWishlist() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-sm mx-auto text-center">

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-2xl 
          bg-gray-100 dark:bg-gray-700 
          flex items-center justify-center 
          mx-auto mb-6"
        >
          <FaHeart className="text-5xl text-gray-400 " />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Your wishlist is empty
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Browse products and save your favorites here.
        </p>

        {/* Button */}
        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 
            px-6 py-3 rounded-xl 
            bg-emerald-600 text-white font-semibold 
            hover:bg-emerald-700 
            transition-colors"
          >
            Browse Products
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

      </div>
    </div>
  );
}