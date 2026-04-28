import CategoryHeader from "@/components/ui/Category/CategoryHeader";
import Loader from "@/components/ui/Loader";
import React from "react";

export default function loading() {
  return (
    <>
      <CategoryHeader />

      <div className=" container my-10 flex items-center justify-center">
        <Loader size="lg" text="Loading Categories" />
      </div>
    </>
  );
}
