/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FaUser,
  FaFloppyDisk,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import apiServices from "@/services/api";
import { signIn, signOut } from "next-auth/react";
import error from './../../error';

export default function AccountSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { isSubmitting: isPasswordSubmitting },
  } = useForm();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // PROFILE SUBMIT
  const onSubmitProfile = async (data: any) => {
    try {
      const res = await apiServices.updateProfile(data);
      console.log(res);
      

      if (res.message === "success") {
        toast.success("Profile updated successfully");
      } else {
        toast.error(res.errors.msg);
      }
    } catch (err) {
      console.log(err);
      
      toast.error('something went wrong');
    }
  };

  // PASSWORD SUBMIT
  const onSubmitPassword = async (data: any) => {
    try {
      const res = await apiServices.changePassword({
        currentPassword: data.currentPassword,
        password: data.newPassword,
        rePassword: data.confirmPassword,
      });

      if (res.message === "success") {
        toast.success("Password updated");

        
        signOut({callbackUrl:"/api/auth/signin"})
        await signIn("credentials", {
          email: res.user.email,
          password: data.newPassword,
          redirect: false,
        });

        window.location.reload(); // علشان كل حاجة تتحدث
      } else {
        toast.error("Wrong password");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <main className="flex-1 min-w-0 space-y-6">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Update your profile information and change your password
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FaUser className="text-2xl text-green-600" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Profile Information
              </h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-5">
            <input
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-green-600 dark:bg-gray-700 dark:text-white"
            />

            <input
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-green-600 dark:bg-gray-700 dark:text-white"
            />

            <input
              {...register("phone")}
              placeholder="01xxxxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-green-600 dark:bg-gray-700 dark:text-white"
            />

            <button
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              <FaFloppyDisk />
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* PASSWORD CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <FaLock className="text-2xl text-amber-600" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Change Password
              </h3>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="space-y-5"
          >
            {/* CURRENT PASSWORD */}
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                {...registerPassword("currentPassword", { required: true })}
                placeholder="Current password"
                className="w-full px-4 py-3 pr-12 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* NEW PASSWORD */}
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                {...registerPassword("newPassword", {
                  required: true,
                  minLength: 6,
                })}
                placeholder="New password"
                className="w-full px-4 py-3 pr-12 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                {...registerPassword("confirmPassword", { required: true })}
                placeholder="Confirm password"
                className="w-full px-4 py-3 pr-12 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              disabled={isPasswordSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700"
            >
              <FaLock />
              Change Password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
