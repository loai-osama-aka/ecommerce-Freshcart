import { FaReceipt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function CheckoutHeader() {
  return (
    <>
    
    <div className="mb-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link className="hover:text-green-600 dark:hover:text-green-400 transition" href="/">
          Home
        </Link>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <Link className="hover:text-green-600 dark:hover:text-green-400 transition" href="/cart">
          Cart
        </Link>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">Checkout</span>
      </nav>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Left side */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <span className="bg-linear-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
            <FaReceipt className="w-6 h-6" />
          </span>
          Complete Your Order
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Review your items and complete your purchase
        </p>
      </div>

      {/* Right side */}
      <Link
        href="/cart"
        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-all"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>
    </div>
 
    
    </>
  );
}
