import Loader from "@/components/ui/Loader";
import React from "react";

export default function loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader size="lg" text="Loading..." />
    </div>
  );
}
