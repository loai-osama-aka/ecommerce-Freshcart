import React from "react";

export default function CardSkeleton() {
  return (
    <div>
      <div className="animate-pulse space-y-3 p-4 rounded-xl border bg-white dark:bg-gray-800">
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}
