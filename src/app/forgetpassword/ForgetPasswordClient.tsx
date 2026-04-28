/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaKey,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import apiServices from "@/services/api";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "code" | "reset">("email");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= STEP 1: SEND EMAIL ================= */
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      const res = await apiServices.forgetPassword(email);

      if (res.statusMsg === "success") {
        toast.success(res.message);
        setStep("code");
      } else {
        toast.error(res.message || "Failed to send code");
      }
    } catch {
      toast.error("Failed to send reset code");
    } finally {
      setLoading(false);
    }
  }

  /* ================= STEP 2: VERIFY CODE ================= */
  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!code) return toast.error("Reset code is required");

    setLoading(true);
    try {
      const res = await apiServices.verifyResetCode(code);

      if (res.status === "Success") {
        toast.success("Code verified");
        setStep("reset");
      } else {
        toast.error("Invalid code");
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  }

  /* ================= STEP 3: RESET PASSWORD ================= */
  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!newPassword) return toast.error("Password is required");

    setLoading(true);

    try {
      const res = await apiServices.resetPassword(email, newPassword);
      console.log(res);
      

      if (res.token) {
        toast.success("Password reset successful");

        // optional auto login logic can go here

        router.push("/auth/login");
      } else {
        toast.error("Reset failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {step === "email" && "Forgot Password"}
            {step === "code" && "Verify Code"}
            {step === "reset" && "Reset Password"}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {step === "email" && "Enter your email to receive reset code"}
            {step === "code" && "Enter the code sent to your email"}
            {step === "reset" && "Create your new password"}
          </p>
        </div>

        {/* ================= EMAIL STEP ================= */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border
                border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {/* ================= CODE STEP ================= */}
        {step === "code" && (
          <form onSubmit={handleCodeSubmit} className="space-y-5">
            <div className="relative">
              <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter reset code"
                className="w-full pl-12 pr-4 py-3 rounded-xl border
                border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        {/* ================= RESET PASSWORD STEP ================= */}
        {step === "reset" && (
          <form onSubmit={handleResetSubmit} className="space-y-5">
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border
                border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* ================= BACK ================= */}
        <div className="text-center mt-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-green-600 hover:underline text-sm"
          >
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}