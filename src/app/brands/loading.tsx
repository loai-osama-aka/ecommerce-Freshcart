import BrandsHeader from "@/components/ui/Brands/BrandsHeader";

import Loader from "@/components/ui/Loader";
import React from "react";

export default function loading() {
  return (
    <>
      <BrandsHeader />

      <div className=" container my-10 flex items-center justify-center">
        <Loader size="lg" text="Loading Brands" />
      </div>
    </>
  );
}
