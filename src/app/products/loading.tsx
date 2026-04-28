import CardSkeleton from "@/components/ui/CardSkeleton";
import ProductsHeader from "@/components/ui/ProductsComponents/ProductsHeader";
import Link from "next/link";
import { FaBoxOpen, FaChevronRight, FaHome } from "react-icons/fa";

export default function ProductsLoading() {
  return (
    <>
      
      <div className=" pt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
