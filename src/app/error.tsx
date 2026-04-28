"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

export default function ErrorPage({
  error,
  reset,
}: {
  error?: Error;
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-lg w-full text-center bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <FaExclamationTriangle className="text-3xl text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Something went wrong
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We encountered an unexpected error. Please try again or go back home.
        </p>

        {/* ERROR MESSAGE (optional) */}
        {error?.message && (
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm text-red-500 mb-6">
            {error.message}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-4 justify-center flex-wrap">
          {/* Retry */}
          {reset && (
            <button
              onClick={() => reset()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
            >
              <FaRedo />
              Try Again
            </button>
          )}

          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold transition"
          >
            <FaHome />
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}