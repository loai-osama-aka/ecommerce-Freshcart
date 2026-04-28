"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import {
  FaEnvelope,
  FaLeaf,
  FaTruck,
  FaTag,
  FaArrowRight,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";


export default function NewsletterSection() {
  const [isSubmitting,setIsSubmitting]=useState(false)
  const formScheme=z.object({
    email: z.string().email('should enter a proper email')
  })

  const{handleSubmit,register,reset,formState:{errors}}=useForm<z.Infer<typeof formScheme>>({
    defaultValues:{
      email:''
    },
    resolver:zodResolver(formScheme)
  })
  function onSubmit(value:z.infer<typeof formScheme>){
    setIsSubmitting(true)
    console.log(value); 
    setTimeout(()=>{setIsSubmitting(false)
      console.log("first");
      reset()
    },3000)
  }
  return (
    <section className="py-16 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto">
        <div className="relative">

          <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 
            dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
            rounded-[2.5rem] border border-emerald-100/50 dark:border-gray-700
            shadow-2xl shadow-emerald-500/10 overflow-hidden relative">

            {/* decorations */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/40 dark:bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">

              {/* LEFT */}
              <div className="lg:col-span-3 space-y-6">

                {/* header */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <FaEnvelope className="text-white text-xl" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                      Newsletter
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      50,000+ subscribers
                    </p>
                  </div>
                </div>

                {/* title */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-snug">
                    Get the Freshest Updates{" "}
                    <span className="text-emerald-600">Delivered Free</span>
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
                    Weekly recipes, seasonal offers & exclusive member perks.
                  </p>
                </div>

                {/* badges */}
                <div className="flex flex-wrap gap-3">

                  <Badge icon={<FaLeaf />} text="Fresh Picks Weekly" />
                  <Badge icon={<FaTruck />} text="Free Delivery Codes" />
                  <Badge icon={<FaTag />} text="Members-Only Deals" />

                </div>

                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
    <div className="grow">

                    <input
                      type="email"
                      {...register("email")}
                      required
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 bg-white dark:bg-gray-800
                      border-2 border-gray-200 dark:border-gray-700
                      rounded-2xl text-gray-900 dark:text-white
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                    />
    </div>
                  

                    {isSubmitting?<button
                                  type="submit"
                                  disabled
                                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl 
                                  font-semibold text-base transition-all duration-300 shadow-lg 
                                  bg-emerald-500 text-white"
                                >
                                  <FaCircleCheck className="text-lg" />
                                  <span>You&apos;re In!</span>
                                </button>
                    :<button
                      type="submit"
                      className={"flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white bg-linear-to-r from-emerald-600 to-emerald-500 hover:scale-[1.02] "}
                    >

                      Submit
                      <FaArrowRight className="text-sm" />
                    </button>}
                    
                  </div>
                </form>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 pl-1">
                  ✨ Unsubscribe anytime. No spam, ever.
                </p>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 dark:lg:border-gray-700 lg:pl-8">

                <div className="bg-linear-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900
                  rounded-3xl p-8 text-white relative overflow-hidden">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl" />

                  <div className="relative space-y-5">

                    <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-full border border-emerald-500/30">
                      📱 MOBILE APP
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      Shop Faster on Our App
                    </h3>

                    <p className="text-gray-300 dark:text-gray-400 text-sm">
                      Get app-exclusive deals & 15% off your first order.
                    </p>

                    <AppButton icon={<FaApple />} title="App Store" />
                    <AppButton icon={<FaGooglePlay />} title="Google Play" />

                    <div className="flex items-center gap-2 text-sm pt-2">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-gray-400">
                        4.9 • 100K+ downloads
                      </span>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ===== Reusable Components ===== */

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 
      bg-white/80 dark:bg-gray-800/70
      border border-emerald-100 dark:border-gray-700
      px-4 py-2.5 rounded-full">

      <div className="w-7 h-7 bg-emerald-100 dark:bg-emerald-900
        rounded-full flex items-center justify-center text-emerald-600">

        {icon}
      </div>

      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {text}
      </span>
    </div>
  );
}

function AppButton({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <a className="flex items-center gap-3 bg-white/10 hover:bg-white/15
      px-4 py-3 rounded-xl transition border border-white/10">

      <div className="text-xl">{icon}</div>

      <div>
        <div className="text-[10px] text-gray-400 uppercase">
          Download on
        </div>
        <div className="text-sm font-semibold text-white">{title}</div>
      </div>

    </a>
  );
}