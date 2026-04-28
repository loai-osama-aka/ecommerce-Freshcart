
import Link from "next/link";
import { FaArrowRight, FaFire } from "react-icons/fa";
import { Sparkles } from "lucide-react"; // better than emoji for ✨
import FadeIn from "@/components/animation/FadeIn";

export default function DealsSection() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={.4} direction="left">

          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">

            {/* decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">

              {/* badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                <FaFire />
                <span>Deal of the Day</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Fresh Organic Fruits
              </h3>

              <p className="text-white/80 mb-4">
                Get up to 40% off on selected organic fruits
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">40% OFF</div>
                <div className="text-sm text-white/70">
                  Use code: <span className="font-bold text-white">ORGANIC40</span>
                </div>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Shop Now <FaArrowRight />
              </Link>
            </div>
          </div>
            </FadeIn>

            <FadeIn delay={.4} direction="right">
    
          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white">

            {/* decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">

              {/* badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                <Sparkles size={16} />
                <span>New Arrivals</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Exotic Vegetables
              </h3>

              <p className="text-white/80 mb-4">
                Discover our latest collection of premium vegetables
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">25% OFF</div>
                <div className="text-sm text-white/70">
                  Use code: <span className="font-bold text-white">FRESH25</span>
                </div>
              </div>

              <Link
                href="/products?sort=newest"
                className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Explore Now <FaArrowRight />
              </Link>
            </div>
          </div>
            </FadeIn>
          

        </div>
      </div>
    </section>
  );
}