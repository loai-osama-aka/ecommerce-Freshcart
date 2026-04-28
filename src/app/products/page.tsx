export const dynamic = "force-dynamic";
import apiServices from "@/services/api";
import ProductCard from "@/components/ui/ProductsComponents/ProductCard";
import ProductsHeader from "@/components/ui/ProductsComponents/ProductsHeader";
import ActiveFilters from "@/components/ui/ActiveFilters";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    subcategory?: string;
  }>;
}) {
  const params = await searchParams;

  console.log("searchParams:", params);

  const products = await apiServices.getProducts({
    ...(params.brand && { brand: params.brand }),
    ...(params.category && { category: params.category }),
    ...(params.subcategory && { subcategory: params.subcategory }),
  });
  let categoryData = null;
  let brandData = null;

  if (params.category) {
    categoryData = await apiServices.getSpecificCategory(params.category);
  }
  if (params.brand) {
    brandData = await apiServices.getSpecificBrand(params.brand);
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ProductsHeader
        params={params}
        categoryData={categoryData}
        brandData={brandData}
      />
      <div className="container mx-auto py-10">
        <div
          className="mb-6 text-sm text-gray-500 dark:text-white
        "
        >
          Showing {products.length} products
        </div>

        <ActiveFilters
          params={params}
          categoryData={categoryData}
          brandData={brandData}
        />
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

/*
import apiServices from "@/services/api";
import ProductCard from "@/components/ui/ProductsComponents/ProductCard";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    subcategory?: string;
  }>;
}) {

 
  const params = await searchParams;

  console.log("searchParams:", params);

  const products = await apiServices.getProducts({
    ...(params.brand && { brand: params.brand }),
    ...(params.category && { category: params.category }),
    ...(params.subcategory && { subcategory: params.subcategory }),
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {params.brand
          ? "Brand Products"
          : params.category
          ? "Category Products"
          : "All Products"}
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}*/
