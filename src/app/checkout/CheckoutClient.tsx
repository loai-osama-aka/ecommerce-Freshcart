"use client";
import { Address } from "@/interfaces/Address/Address";
import { AddToCartResponse } from "@/interfaces/cart/AddToCartResponse";
import apiServices from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaHouse,
  FaWallet,
  FaBox,
  FaPhone,
  FaCity,
  FaMoneyBill,
  FaCreditCard,
} from "react-icons/fa6";
import EmptyCart from "../cart/EmptyCart";
import { FaPlus, FaSpinner } from "react-icons/fa";
import Link from "next/link";

export default function CheckoutClient({
  addresses,
  cart,
}: {
  addresses: Address[];
  cart: AddToCartResponse;
}) {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isloading, setIsloading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

  async function handleCheckout() {
    if (!selectedAddress) {
      toast.error("Please select address first");
      return;
    }

    const body = {
      shippingAddress: {
        details: selectedAddress.details,
        phone: selectedAddress.phone,
        city: selectedAddress.city,
      },
    };

    try {
      if (paymentMethod === "cash") {
        setIsloading(true);
        const res = await apiServices.cashOnOrder(cart.cartId, body);
        setIsloading(false);
        toast.success(res.message);
        router.push("/cart");
        console.log(res, "cashhh");
      } else {
        //online payment
        setIsloading(true);
        const res = await apiServices.checkout(cart.cartId, body);
        setIsloading(false);
        window.location.href = res.session.url;
        console.log(res, "onlineeee");
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (cart.numOfCartItems == 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">
        {/* ================= ADDRESS ================= */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaHouse /> Shipping Address
            </h2>
            <p className="text-green-100 text-sm mt-1">
              Where should we deliver your order?
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Select a saved address
              </p>

              {addresses.map((addr) => (
                <button
                  key={addr._id}
                  onClick={() => setSelectedAddress(addr)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200
              ${
                selectedAddress?._id === addr._id
                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                  : "border-gray-200 dark:border-gray-700 hover:border-green-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                ${
                  selectedAddress?._id === addr._id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
                    >
                      <FaHouse />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {addr.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        {addr.details}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaPhone /> {addr.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCity /> {addr.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              <Link
                href={"/profile/address"}
                className=" hover:-translate-y-1 transition-transform duration-300 flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900 rounded-xl border border-green-100 dark:border-green-700"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaPlus className=" size-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    want to add a new Address?
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
                    Please ensure your address is accurate for smooth delivery
                  </p>
                </div>
              </Link>
            </div>

            {/* Info Box */}
            <div className="hover:-translate-y-1 transition-transform duration-300 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-xl border border-blue-100 dark:border-blue-700">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                ℹ️
              </div>
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                  Delivery Information
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
                  Please ensure your address is accurate for smooth delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAYMENT ================= */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaWallet /> Payment Method
            </h2>
            <p className="text-green-100 text-sm mt-1">
              Choose how you&apos;d like to pay
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* CASH */}
            <button
              onClick={() => setPaymentMethod("cash")}
              className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4
          ${
            paymentMethod === "cash"
              ? "border-green-500 bg-green-50 dark:bg-green-900 shadow-sm"
              : "border-gray-200 dark:border-gray-700 hover:border-green-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center
          ${
            paymentMethod === "cash"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
              >
                <FaMoneyBill />
              </div>

              <div className="flex-1 text-left">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Cash on Delivery
                </h3>
                <p className="text-sm text-gray-500">
                  Pay when your order arrives
                </p>
              </div>

              {paymentMethod === "cash" && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-600 text-white">
                  ✓
                </div>
              )}
            </button>

            {/* ONLINE */}
            <button
              onClick={() => setPaymentMethod("online")}
              className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4
          ${
            paymentMethod === "online"
              ? "border-green-500 bg-green-50 dark:bg-green-900 shadow-sm"
              : "border-gray-200 dark:border-gray-700 hover:border-green-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center
          ${
            paymentMethod === "online"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
              >
                <FaCreditCard />
              </div>

              <div className="flex-1 text-left">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Pay Online
                </h3>
                <p className="text-sm text-gray-500">
                  Secure payment with card
                </p>
              </div>

              {paymentMethod === "online" && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-600 text-white">
                  ✓
                </div>
              )}
            </button>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900 rounded-xl border border-green-100 dark:border-green-700 mt-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                🔒
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Secure & Encrypted
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-0.5">
                  Your payment info is protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm sticky top-4">
          {/* HEADER */}
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaBox /> Order Summary
            </h2>
            <p className="text-green-100 text-sm mt-1">
              {cart.numOfCartItems} items
            </p>
          </div>

          {/* PRODUCTS */}
          <div className="p-5">
            <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
              {cart.data.products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {/* IMAGE */}
                  <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                    <img
                      src={p.product.imageCover}
                      alt={p.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {p.product.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {p.count} × {p.price} EGP
                    </p>
                  </div>

                  {/* PRICE */}
                  <p className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
                    {p.price * p.count}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-gray-100 dark:border-gray-700 my-4" />

            {/* TOTAL */}
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span className="font-medium">
                  {cart.data.totalCartPrice} EGP
                </span>
              </div>

              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>

              <hr className="border-gray-100 dark:border-gray-700" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">
                    {cart.data.totalCartPrice}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">EGP</span>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            {/* {isloading?} */}
            <button
              disabled={isloading}
              onClick={handleCheckout}
              className="w-full mt-6 bg-linear-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <FaBox /> Place Order
              {isloading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <FaBox /> <span>place order</span>
                </>
              )}
            </button>

            {/* FOOTER */}
            <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500">
              <span>Secure</span>
              <span>|</span>
              <span>Fast Delivery</span>
              <span>|</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
