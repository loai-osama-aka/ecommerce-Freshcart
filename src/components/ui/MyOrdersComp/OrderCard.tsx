"use client";

import { Order } from "@/interfaces/myOrders/Order";
import { useState } from "react";
import { FaPhone, FaReceipt } from "react-icons/fa";
import {
  FaCalendarDays,
  FaBox,
  FaLocationDot,
  FaMoneyBill,
  FaCreditCard,
  FaChevronDown,
  FaTruck,
  FaClock,
} from "react-icons/fa6";



const OrderCard = ({ order }: {order:Order}) => {
  const [open, setOpen] = useState(false);
  const firstProduct = order.cartItems[0]?.product;
  const extraCount = order.cartItems.length - 1;

  const isPaid = order.isPaid;
  const isCash = order.paymentMethodType === "cash";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">

      <div className="p-5 sm:p-6">
        <div className="flex gap-5">

          {/* Image */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border border-gray-100 dark:border-gray-600 p-2.5 overflow-hidden">
              <img
                src={firstProduct?.imageCover}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>

            {extraCount > 0 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                +{extraCount}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Top */}
            <div className="flex items-start justify-between gap-3 mb-3">

              <div>
                {/* Status */}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2
                  ${
                    isPaid
                      ? "bg-blue-100 text-blue-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {isPaid ? <FaTruck /> : <FaClock />}
                  <span className="text-xs font-semibold">
                    {isPaid ? "On the way" : "Processing"}
                  </span>
                </div>

                {/* Order ID */}
                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                  #{order.id}
                </h3>
              </div>

              {/* Payment Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${
                  isCash
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-purple-100"
                }`}
              >
                {isCash ? (
                  <FaMoneyBill className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaCreditCard className="text-purple-600" />
                )}
              </div>
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">

              {/* Date */}
              <span className="flex items-center gap-1.5">
                <FaCalendarDays />
                {new Date(order.createdAt).toLocaleDateString()}
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              {/* Items */}
              <span className="flex items-center gap-1.5">
                <FaBox />
                {order.cartItems.length} items
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              {/* City */}
              <span className="flex items-center gap-1.5">
                <FaLocationDot />
                {order.shippingAddress.city}
              </span>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between gap-4">

              {/* Price */}
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {order.totalOrderPrice}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>

              {/* Button */}
              {open?  <button 
                onClick={()=>setOpen(false)} 
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-green-600 text-white shadow-lg shadow-green-600/25">
                Hide
                <FaChevronDown className="text-xs transition-transform duration-300  " />
              </button> :<button
              onClick={()=>setOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                Details
                <FaChevronDown className={`text-xs transition-transform duration-300 rotate-180 `} />
              </button>}
             
            </div>

          </div>
        </div>
      </div>
      {/* ********************order details**************** */}
      {open && (
  <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/40">
    
    {/* Order Items */}
    <div className="p-5 sm:p-6">
      <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2 mb-4">
        
        {/* Icon */}
        <div className="w-6 h-6 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <FaReceipt className="text-xs text-green-600 dark:text-green-400" />
        </div>

        Order Items
      </h4>

      <div className="space-y-3">
        {order.cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-700 p-2 shrink-0">
              <img
                src={item.product.imageCover}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">
                {item.product.title}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {item.count}
                </span>{" "}
                × {item.price} EGP
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {item.price * item.count}
              </p>
              <p className="text-xs text-gray-400">EGP</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Section */}
    <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
      
      {/* Address */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2 mb-3">
          
          <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <FaLocationDot className="text-xs text-blue-600 dark:text-blue-400" />
          </div>

          Delivery Address
        </h4>

        <div className="space-y-2">
          <p className="font-medium text-gray-900 dark:text-white">
            {order.shippingAddress.city}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {order.shippingAddress.details}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 pt-1">
            <FaPhone className="text-xs text-gray-400" />
            {order.shippingAddress.phone}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2 mb-3">
          
          <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
            <FaClock className="text-xs text-white" />
          </div>

          Order Summary
        </h4>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Subtotal</span>
            <span className="font-medium">
              {order.totalOrderPrice - order.shippingPrice} EGP
            </span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Shipping</span>
            <span className="font-medium">
              {order.shippingPrice} EGP
            </span>
          </div>

          <hr className="border-gray-200/50 dark:border-gray-600 my-2" />

          <div className="flex justify-between pt-1">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {order.totalOrderPrice} EGP
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default OrderCard;