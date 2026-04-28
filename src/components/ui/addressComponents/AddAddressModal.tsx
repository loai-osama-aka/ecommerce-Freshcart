"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import apiServices from "@/services/api";
import toast from "react-hot-toast";
import { AddAddressResponse } from "@/interfaces/Address/AddAddressResponse";
import { useRouter } from "next/navigation";
import { Address } from "@/interfaces/Address/Address";
import { useEffect } from "react";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  address?: Address | null;
};
export default function AddAddressModal({ isOpen, onClose, address }: Props) {
  const router = useRouter();
  const formScheme = z.object({
    name: z.string().min(2, "Address name is required"),
    details: z.string().min(10, "Full address must be at least 10 characters"),
    phone: z
      .string()
      .regex(/^01[0-9]{9}$/, "Enter a valid Egyptian phone number"),
    city: z.string().min(2, "City is required"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
  });
  useEffect(() => {
    if (address) {
      reset({
        name: address.name,
        details: address.details,
        phone: address.phone,
        city: address.city,
      });
    } else {
      reset({
        name: "",
        details: "",
        phone: "",
        city: "",
      });
    }
  }, [address, reset]);

  async function onSubmit(value: z.infer<typeof formScheme>) {
    if (address) {
      const response: AddAddressResponse = await apiServices.editAddress(
        value,
        address._id,
      );
      if (response.status == "success") {
        toast.success(response.message);
        onClose();
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } else {
      // console.log(value);
      const response: AddAddressResponse = await apiServices.AddAddress(value);
      if (response.status == "success") {
        toast.success(response.message);
        onClose();
        router.refresh();
      } else {
        toast.error(response.message);
      }
    }
  }
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Address
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Address Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Address Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="e.g. Home, Office"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Address
            </label>
            <textarea
              {...register("details")}
              rows={3}
              placeholder="Street, building, apartment..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all resize-none"
            />
            {errors.details && (
              <p className="text-red-500 text-sm mt-1">
                {errors.details?.message}
              </p>
            )}
          </div>

          {/* Phone + City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="01xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <input
                {...register("city")}
                type="text"
                placeholder="Cairo"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : address ? "Update" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
