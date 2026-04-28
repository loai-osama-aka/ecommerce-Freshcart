/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Logo from "./../../../../public/freshcart-logo.49f1b44d.svg";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCreditCard,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ===== BRAND INFO ===== */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                {/* 🔥 Logo Placeholder */}
                <Image
                  src={Logo.src} // <-- put your logo path here
                  alt="FreshCart Logo"
                  width={160}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </Link>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands.
            </p>

            {/* CONTACT */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhone className="text-green-500" />
                <span>+1 (800) 123-4567</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-green-500" />
                <span>support@freshcart.com</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-green-500" />
                <span>123 Commerce Street, New York</span>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-6">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-green-600 hover:text-white transition"
                  >
                    <Icon />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* ===== SHOP ===== */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/products">All Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
              <li>
                <Link href="/products?category=6439d2d167d9aa4ca970649f">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=6439d58a0049ad0b52b9003f">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=6439d5b90049ad0b52b90048">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=6439d30b67d9aa4ca97064b1">
                  Beauty & Health
                </Link>
              </li>
              {/* 
              


 */}
            </ul>
          </div>

          {/* ===== ACCOUNT ===== */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Account</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/profile">My Account</Link>
              </li>
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
            </ul>
          </div>

          {/* ===== SUPPORT ===== */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping</Link>
              </li>
            </ul>
          </div>

          {/* ===== LEGAL ===== */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== BOTTOM ===== */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 FreshCart. All rights reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <FaCreditCard />
            <span>Visa</span>

            <FaCreditCard />
            <span>Mastercard</span>

            <FaCreditCard />
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
