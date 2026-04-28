import { Order } from "@/interfaces/myOrders/Order";
import Link from "next/link";
import { FaBox, FaBagShopping } from "react-icons/fa6";

const MyOrdersHeader = ({ orders }: { orders: number }) => {
  return (
    <div className="mb-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link
          href="/"
          className="hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Home
        </Link>

        <span className="text-gray-300 dark:text-gray-600">/</span>

        <span className="text-gray-900 dark:text-white font-medium">
          My Orders
        </span>
      </nav>

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Side */}
        <div className="flex items-center gap-4">
          
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25 dark:shadow-green-900/30">
            <FaBox className="text-2xl text-white" />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              My Orders
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
              Track and manage your {orders} orders
            </p>
          </div>

        </div>

        {/* Right Side */}
        <Link
          href="/products"
          className="self-start sm:self-auto text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/30 transition-all text-sm"
        >
          <FaBagShopping className="text-xs" />
          Continue Shopping
        </Link>

      </div>
    </div>
  );
};

export default MyOrdersHeader;