/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import {
  FaStar,
  FaShieldAlt,
  FaGoogle,
  FaUserPlus,
  FaFacebookF,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { useState } from "react";
import apiServices from "@/services/api";
import { FaTruckFast } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  terms: boolean;
};

export default function RegisterPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await apiServices.signUp(values);

      if (res.message === "success") {
        console.log("SUCCESS:", res);
        toast.success(res.message);
        router.push("/auth/login");
      } else {
        toast.error(res.errors.msg);
      }
    } catch (err) {
      console.error(err, "errr");
      toast.error("account already exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        {/* LEFT SIDE */}
        <div>
          {/* Heading */}
          <h1 className="text-4xl font-bold dark:text-white">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>

          <p className="text-xl mt-2 mb-4 text-gray-700 dark:text-gray-300">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          {/* Features */}
          <ul className="space-y-6 my-8">
            {/* Item 1 */}
            <li className="flex items-start gap-4">
              <div className="size-12 text-lg bg-green-200 dark:bg-green-900 text-green-600 rounded-full flex justify-center items-center">
                <FaStar />
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">
                  Premium Quality
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </li>

            {/* Item 2 */}
            <li className="flex items-start gap-4">
              <div className="size-12 text-lg bg-green-200 dark:bg-green-900 text-green-600 rounded-full flex justify-center items-center">
                <FaTruckFast />
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">
                  Fast Delivery
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Same-day delivery available in most areas
                </p>
              </div>
            </li>

            {/* Item 3 */}
            <li className="flex items-start gap-4">
              <div className="size-12 text-lg bg-green-200 dark:bg-green-900 text-green-600 rounded-full flex justify-center items-center">
                <FaShieldAlt />
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">
                  Secure Shopping
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data and payments are completely secure
                </p>
              </div>
            </li>
          </ul>

          {/* Review */}
          <div className="bg-white dark:bg-gray-800 shadow-sm p-4 rounded-md">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://freshcart-route.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freview-author.04728971.png&w=1080&q=75"
                alt="author"
                className="size-12 rounded-full"
              />

              <div>
                <h3 className="dark:text-white">Sarah Johnson</h3>

                {/* Stars */}
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>

            <blockquote>
              <p className="italic text-gray-600 dark:text-gray-400">
                "FreshCart has transformed my shopping experience. The quality
                of the products is outstanding, and the delivery is always on
                time. Highly recommend!"
              </p>
            </blockquote>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-6 py-10 transition-colors">
          <h2 className="text-center text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
            Create Your Account
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Start your fresh journey with us today
          </p>

          {/* Social Buttons */}
          <div
            className="
        flex gap-2 my-10
        *:flex-1
      "
          >
            {/* Google */}
            <button
              type="button"
              className="
          flex items-center justify-center gap-2
          border border-gray-300 dark:border-gray-600
          bg-transparent
          hover:bg-gray-100 dark:hover:bg-gray-700
          text-gray-900 dark:text-white
          rounded-lg py-2
          transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
            >
              <FaGoogle className="text-red-500 text-lg" />
              <span>Google</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              className="
          flex items-center justify-center gap-2
          border border-gray-300 dark:border-gray-600
          bg-transparent
          hover:bg-gray-100 dark:hover:bg-gray-700
          text-gray-900 dark:text-white
          rounded-lg py-2
          transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
            >
              <FaFacebookF className="text-blue-600 text-lg" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white dark:bg-gray-800 px-3 text-sm text-gray-500">
              or
            </span>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* Name */}
            <Input label="Name" error={errors.name?.message}>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
  bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ali"
              />
            </Input>

            {/* Email */}
            <Input label="Email" error={errors.email?.message}>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
  bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                placeholder="ali@example.com"
              />
            </Input>

            {/* Password */}
            <Input
              label="Password"
              className="relative"
              error={errors.password?.message}
            >
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  {...register("password", {
                    required: "Password required",
                    minLength: {
                      value: 8,
                      message: "Min 8 characters",
                    },
                  })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
  bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showCurrent ? (
                    <FaEyeSlash className="hover:text-green-400 text-2xl text-black" />
                  ) : (
                    <FaEye className="hover:text-green-400 text-2xl text-black" />
                  )}
                </button>
              </div>
            </Input>

            {/* Confirm Password */}
            <Input label="Confirm Password" error={errors.rePassword?.message}>
              <div className="relative">
                <input
                  type={showRepassword ? "text" : "password"}
                  placeholder="please ReEnter your password"
                  {...register("rePassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
  bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowRepassword(!showRepassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showRepassword ? (
                    <FaEyeSlash className="hover:text-green-400 text-2xl text-black" />
                  ) : (
                    <FaEye className="hover:text-green-400 text-2xl text-black" />
                  )}
                </button>
              </div>
            </Input>

            {/* Phone */}
            <Input label="Phone" error={errors.phone?.message}>
              <input
                {...register("phone", { required: "Phone required" })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
  bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                placeholder="010..."
              />
            </Input>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("terms", { required: "Accept terms" })}
              />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                I agree to Terms & Privacy
              </span>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <FaUserPlus />
              {loading ? "Creating..." : "Create My Account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Feature({ icon, title, desc }: any) {
  return (
    <li className="flex gap-4">
      <div className="w-12 h-12 flex items-center justify-center bg-green-200 text-green-600 rounded-full text-xl">
        {icon}
      </div>
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{desc}</p>
      </div>
    </li>
  );
}

function Input({ label, children, error }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 dark:text-gray-300">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
