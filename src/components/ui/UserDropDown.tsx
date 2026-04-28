"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

export default function UserDropDown() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router=useRouter()
  
  return (
    <div className="relative hidden lg:block">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition group"
      >
        <FaUserCircle className="text-xl text-gray-500 dark:text-gray-300 group-hover:text-green-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
          {/* User Info */}
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

          {/* Menu Items */}
          <div onClick={() => setOpen(false)} className="py-2">
            <MenuItem href="/profile" icon={<FaUser />} label="My Profile" />
            <MenuItem
              href="/allorders"
              icon={<FaBoxOpen />}
              label="My Orders"
            />
            <MenuItem href="/wishlist" icon={<FaHeart />} label="My Wishlist" />
            <MenuItem
              href="/profile/address"
              icon={<FaAddressBook />}
              label="Addresses"
            />
            <MenuItem
              href="/profile/settings"
              icon={<FaCog />}
              label="Settings"
            />
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 dark:border-gray-700 py-2">
            <button
              onClick={() => {
                signOut({ callbackUrl: "/api/auth/signin" });
                router.refresh()
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 w-full transition"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>
      )}
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
