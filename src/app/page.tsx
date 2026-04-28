import FadeIn from "@/components/animation/FadeIn";
import HeroSlider from "@/components/ui/Home/Carousel";
import DealsSection from "@/components/ui/Home/DealsSection";
import NewsletterSection from "@/components/ui/Home/NEwsletterSection";
import Pros from "@/components/ui/Home/Pros";
import ProductCard from "@/components/ui/ProductsComponents/ProductCard";
import apiServices from "@/services/api";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function Home() {
  async function getProducts() {
    return await apiServices.getProducts();
  }
  async function getCategories() {
    return await apiServices.getCategory();
  }
  const category = await getCategories();

  const products = await getProducts();
  return (
    <div className="dark:bg-gray-900 bg-white py-8">
      {/* HERO */}
      <FadeIn direction="up">
        <HeroSlider />
      </FadeIn>

      {/* PROS */}
      <FadeIn delay={0.1}>
        <Pros />
      </FadeIn>

      {/* CATEGORY SECTION */}
      <FadeIn direction="right" delay={0.2}>
        <section className="py-5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
              <div className="flex items-center gap-3 my-8">
                <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-800">
                  Shop By <span className="text-emerald-600">Category</span>
                </h2>
              </div>

              <Link
                href="/categories"
                className="text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                View All Categories
                <FaArrowRight className="ml-2 size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {category.map((cat) => {
                return (
                  <Link
                    key={cat._id}
                    href={`/categories/${cat._id}`}
                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 
      p-4 sm:p-6 shadow-sm hover:shadow-xl 
      hover:border-emerald-200 dark:hover:border-emerald-500 
      transition-all duration-300 hover:-translate-y-1 block"
                  >
                    {/* Image */}
                    <div
                      className="aspect-square rounded-xl overflow-hidden 
        bg-gray-50 dark:bg-gray-700 mb-4"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover 
          group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-gray-900 dark:text-white text-center 
        group-hover:text-emerald-600 transition-colors"
                    >
                      {cat.name}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* DEALS */}

      <DealsSection />

      {/* Products */}

      <FadeIn direction="right" delay={0.2}>
        <section className="py-5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
              <div className="flex items-center gap-3 my-8">
                <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-800">
                  Featured <span className="text-emerald-600">Products</span>
                </h2>
              </div>

              <Link
                href="/products"
                className="text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                View All Products
                <FaArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
      {/* products */}
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 10).map((product, idx) => (
          <div key={idx}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <FadeIn delay={0.4} direction="up">
        <NewsletterSection />
      </FadeIn>
    </div>
  );
}
