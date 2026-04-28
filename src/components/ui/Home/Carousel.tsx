"use client";
import homeSlider3 from '../../../assets/images/home-slider-1.d79601a8.png'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";



export default function HeroSlider() {
  return (
    <div className="relative">

      <Swiper
        modules={[Navigation, Pagination] }
      
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop
        className="h-100"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-100 flex  relative items-center justify-center"
          >
             <img
                 src={homeSlider3.src}
                className="absolute  w-full h-full object-cover"
                alt="groceries"
                />
            {/* overlay */}
            <div className="w-full h-full bg-linear-to-r absolute from-green-500/90 to-green-400/50 flex items-center"></div>
              <div className="relative z-10 container mx-auto px-4 text-white">
                <h2 className="text-3xl font-bold mb-4 max-w-md">
                  Fresh Products Delivered to your Door
                </h2>
                <p>Get 20% off your first order</p>

                <div className="mt-4 flex gap-2">
                  <Link href={'/products'} className="bg-white text-green-500 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    Shop Now
                  </Link>
                  <a className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    View Deals
                  </a>
                </div>
              </div>
            
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            style={{
              backgroundImage:
                "url(https://freshcart-route.vercel.app/_next/static/media/home-slider-1.d79601a8.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-100 flex items-center justify-center"
          >
            <div className="w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <h2 className="text-3xl font-bold mb-4 max-w-md">
                  Premium Quality Guaranteed
                </h2>
                <p>Fresh from farm to your table</p>

                <div className="mt-4 flex gap-2">
                  <Link href={'/products'} className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold">
                    Shop Now
                  </Link>
                  <a className="border border-white text-white px-6 py-2 rounded-lg font-semibold">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
  <div className="h-100 flex items-center justify-center relative">

    {/* Image (BACK) */}
    <img
      src={homeSlider3.src}
      className="absolute  w-full h-full object-cover"
      alt="groceries"
    />

    {/* Gradient Overlay (MIDDLE) */}
    <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50"></div>

    {/* Content (FRONT) */}
    <div className="relative z-10 container mx-auto px-4 text-white">
      <h2 className="text-3xl font-bold mb-4 max-w-md">
        Fast & Free Delivery
      </h2>

      <p>Same day delivery available</p>

      <div className="mt-4 flex gap-2">
        <Link
          href={'/products'}
          className="bg-white text-purple-500 px-6 py-2 rounded-lg font-semibold"
        >
          Order Now
        </Link>

        <a className="border border-white text-white px-6 py-2 rounded-lg font-semibold">
          Delivery Info
        </a>
      </div>
    </div>

  </div>
</SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg hover:scale-110 transition">
        <FaChevronLeft />
      </div>

      <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg hover:scale-110 transition">
        <FaChevronRight />
      </div>
    </div>
  );
}