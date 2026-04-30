"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaUserCircle,
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaAddressBook,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

export default function UserDropDown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const session = useSession();

  // 🔒 close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔒 close on ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      ref={ref}
      className="relative hidden lg:block"
      onMouseEnter={() => setOpen(true)}   // hover open
      onMouseLeave={() => setOpen(false)}  // hover close
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)} // click toggle
        className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <FaUserCircle className="text-xl text-gray-500 dark:text-gray-300 hover:text-green-600" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full pt-2 transition-all duration-200 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2"
        }`}
      >
        <div className="w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          
          {/* User */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <FaUserCircle className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {session.data?.user.name}
                </p>
                <p className="text-xs text-gray-400">
                  {session.data?.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="py-2" onClick={() => setOpen(false)}>
            <MenuItem href="/profile" icon={<FaUser />} label="My Profile" />
            <MenuItem href="/allorders" icon={<FaBoxOpen />} label="My Orders" />
            <MenuItem href="/wishlist" icon={<FaHeart />} label="My Wishlist" />
            <MenuItem href="/profile/address" icon={<FaAddressBook />} label="Addresses" />
            <MenuItem href="/profile/settings" icon={<FaCog />} label="Settings" />
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 dark:border-gray-700 py-2">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 w-full transition"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </Link>
  );
}