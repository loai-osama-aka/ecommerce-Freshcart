"use client";

import Link from "next/link";
import {
  FaHome,
  FaArrowLeft,
  FaShoppingCart,
  FaAppleAlt,
  FaCarrot,
  FaLemon,
  FaSeedling,
} from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden bg-[#fafbfc] dark:bg-gray-900">
      {/* Background floating icons */}
      <div className="absolute inset-0 overflow-hidden">

        <FloatingIcon className="top-[10%] left-[5%] text-green-300 text-3xl animate-pulse">
          <FaAppleAlt className="animate-pulse" />
        </FloatingIcon>

        <FloatingIcon className="top-[20%] right-[10%] text-orange-300 text-2xl animate-pulse">
          <FaCarrot />
        </FloatingIcon>

        <FloatingIcon className="bottom-[25%] left-[8%] text-yellow-300 text-2xl animate-pulse">
          <FaLemon />
        </FloatingIcon>

        <FloatingIcon className="bottom-[15%] right-[15%] text-green-300 text-3xl animate-pulse">
          <FaSeedling />
        </FloatingIcon>

        <div className="absolute top-0 right-0 w-125 h-125 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-green-200/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl w-full text-center">

        {/* Card */}
        <div className="flex justify-center mb-10">
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 w-72 h-60 bg-green-200/40 blur-2xl rounded-3xl" />

            {/* Main card */}
            <div className="relative w-72 h-60 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center">

              <FaShoppingCart className="text-6xl text-green-400/70" />

              {/* 404 badge */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                404
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900 dark:text-white">
          Oops! Page Not Found
        </h1>

        <p className="text-gray-500 dark:text-gray-300 mb-10">
          Looks like this page went missing in action. Let’s get you back home.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            <FaHome /> Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {["/products", "/categories", "/contact"].map((link, i) => (
            <Link
              key={i}
              href={link}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900 transition"
            >
              {link.replace("/", "").toUpperCase() || "HOME"}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Floating icon wrapper */
function FloatingIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      {children}
    </div>
  );
}