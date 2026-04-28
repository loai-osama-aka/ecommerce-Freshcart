/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { FaBoxOpen, FaArrowRight } from "react-icons/fa";

export default function EmptyCart() {
    return (
        <div className=" flex items-center py-10 justify-center px-4 bg-white dark:bg-gray-900 transition-colors">
            <div className="text-center">

                {/* Icon */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 rounded-full bg-linear-to-br 
                    from-gray-100 to-gray-50 
                    dark:from-gray-800 dark:to-gray-700 
                    flex items-center justify-center mx-auto">

                        <FaBoxOpen className="text-5xl text-gray-300 dark:text-gray-500" />
                    </div>

                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 
                 w-24 h-5 bg-gray-100 dark:bg-gray-800 rounded-full blur-md">
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Your cart is empty
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    Looks like you haven't added anything to your cart yet.
                    <br />
                    Start exploring our products!
                </p>

                {/* Button */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 
            bg-linear-to-r from-green-600 to-green-700 
            text-white py-3.5 px-8 rounded-xl font-semibold 
            hover:from-green-700 hover:to-green-800 
            transition-all shadow-lg shadow-green-600/20 
            active:scale-[0.98]"
                >
                    Start Shopping
                    <FaArrowRight className="text-sm" />
                </Link>

                {/* Categories */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                        Popular Categories
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">

                        {["Electronics", "Fashion", "Home", "Beauty"].map((cat) => (
                            <Link
                                key={cat}
                                href="/categories"
                                className="px-4 py-2 
                  bg-gray-50 dark:bg-gray-800 
                  hover:bg-primary-50 dark:hover:bg-primary-900/30 
                  hover:text-primary-600 
                  text-gray-600 dark:text-gray-300 
                  rounded-full text-sm font-medium 
                  transition-colors"
                            >
                                {cat}
                            </Link>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
}