import React from "react";
import apiServices from "@/services/api";
import Productdetail from "@/components/ui/ProductsComponents/Productdetail";


export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = await params.then((res) => res.productId);

  const product = await apiServices.getProductsDetails(productId);
  console.log(product, "product detaaaaails");

  return <Productdetail product={product} />;
}
