/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
"use client";
import avatar from "../../../../public/freshcart-logo.49f1b44d.svg";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHeadset,
} from "react-icons/fa";
import { cartContext } from "@/Contexts/CartContext";
import { Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import UserDropDown from "@/components/ui/UserDropDown";
import { wishListContext } from "@/Contexts/WishlistContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const session = useSession();
  const router=useRouter()
  // console.log(session.data?.user.token);
  //  const {counter}= useSelector((state:RootState)=>state.counter)

  const { cartCount, isLoading } = useContext(cartContext);
  const { wishlistCount, isLoading: isWishlistLoading } =
    useContext(wishListContext);

  // load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // const categories:Category[]=await apiServices.getCategory()

  useEffect(() => {}, []);

  // toggle theme
  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
            {/* LOGO */}
            <Link href="/" className="shrink-0 text-white font-bold text-xl">
              {/* logo */}
              <img
                src={avatar.src}
                alt="fresh cart logo"
                className="p-2 rounded-2xl dark:bg-white"
              />
            </Link>

            {/* SEARCH (Desktop) */}
            <form className="hidden lg:flex flex-1 max-w-2xl">
              <div className="relative w-[80%] m-auto">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 dark:border-gray-700 
  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
  focus:bg-white dark:focus:bg-gray-900 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center">
                  <FaSearch />
                </button>
              </div>
            </form>

            {/* NAV LINKS */}
            <nav className="hidden xl:flex items-center gap-6">
              <Link
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium transition-colors"
                href="/products"
              >
                Shop
              </Link>
              {/* Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 dark: text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium transition-colors">
                  Categories <FaChevronDown className="text-xs" />
                </button>

                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl py-2 w-48 border border-gray-200 dark:border-gray-700">
                    <Link
                      href="/categories"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium transition-colors"
                    >
                      All Categories
                    </Link>
                    <Link
                      href="/products?category=6439d2d167d9aa4ca970649f"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Electronics
                    </Link>
                    <Link
                      href="/products?category=6439d58a0049ad0b52b9003f"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Women's Fashion
                    </Link>
                    <Link
                      href="/products?category=6439d5b90049ad0b52b90048"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Men's Fashion
                    </Link>
                    <Link
                      href="/products?category=6439d30b67d9aa4ca97064b1"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Beauty & Health
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium transition-colors"
                href="/brands"
              >
                Brands
              </Link>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              {/* Dark / Light Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 transition"
              >
                {dark ? <FaSun title="light" /> : <FaMoon title="dark" />}
              </button>

              {/* Support */}
              <Link
                href="/contact"
                className="hidden hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded lg:flex items-center gap-2 pr-3 border-r border-gray-200 dark:border-gray-700"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300">
                  <FaHeadset />
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <div>Support</div>
                  <div className="font-semibold">24/7 Help</div>
                </div>
              </Link>
              {session.status == "loading" ? (
                ""
              ) : session.status == "authenticated" ? (
                <>
                  {/* Icons */}
                  <Link
                    href="/wishlist"
                    className="p-2.5 relative rounded-full text-gray-400 dark:text-gray-300 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-red-500 transition"
                  >
                    <FaHeart className="" size={24} />
                    {/* wishlist badge */}
                    <span
                      className="absolute top-0 right-0 
          min-w-4.5 min-h-4.5 px-1 
          flex items-center justify-center 
          text-[10px] font-bold text-white 
          bg-red-500 rounded-full"
                    >
                      {isWishlistLoading ? (
                        <Loader2 className="animate-spin size-2" />
                      ) : (
                        wishlistCount
                      )}
                    </span>
                  </Link>

                  <Link
                    href="/cart"
                    className="p-2.5 relative rounded-full text-gray-400 dark:text-gray-300 hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-green-500 transition"
                  >
                    <FaShoppingCart size={24} />

                    {/* cart Badge */}
                    <span
                      className="absolute top-0 right-0
          min-w-4.5 min-h-4.5 px-1 
          flex items-center justify-center 
          text-[10px] font-bold text-white 
          bg-green-600 rounded-full"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin size-2" />
                      ) : (
                        cartCount
                      )}
                    </span>
                  </Link>
                  <UserDropDown />
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full"
                  >
                    <FaUser /> Sign In
                  </Link>
                </>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden w-10 h-10 bg-green-600 cursor-pointer text-white rounded-full flex items-center justify-center"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Side menu */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 ">
            <span className="font-bold"></span>
            <button
              className="bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 w-12 h-12 flex items-center justify-center rounded-full"
              onClick={() => setOpen(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="mx-4 border-t border-gray-300"></div>

          {/* Search */}
          <div className="p-4 ">
            <div className="relative">
              <input
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 
  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
  focus:bg-white dark:focus:bg-gray-900 focus:outline-none"
                placeholder="Search Products..."
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center"
              >
                <FaSearch className="rounded-2xl  right-3 top-3 text-white " />
              </button>
            </div>
          </div>
          <div className="mx-4 border-t border-gray-300"></div>

          {/* Links */}
          <nav className="p-4 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              Categories
            </Link>
            <Link
              href="/brands"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              Brands
            </Link>
          </nav>
          <div className="mx-4 border-t border-gray-300"></div>
          {session.status == "authenticated" ? (
            <div className="p-4 space-y-1">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900 flex items-center justify-center relative">
                    <FaHeart className="text-red-500" />

                    {/* wishlist Badge */}
                    <span
                      className="absolute -top-1 -right-1 
                 min-w-4.5 min-h-4.5 px-1 
                  flex items-center justify-center 
                  text-[10px] font-bold text-white 
                 bg-red-500 rounded-full"
                    >
                      {wishlistCount}
                    </span>
                  </div>

                  <span className="font-medium dark:text-gray-50 text-gray-700">
                    Wishlist
                  </span>
                </div>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900 flex items-center justify-center relative">
                    <FaShoppingCart className="text-green-600" />

                    {/* cart Badge */}
                    <span
                      className="absolute -top-1 -right-1 
                       min-w-4.5 min-h-4.5 px-1 
                       flex items-center justify-center 
                                    text-[10px] font-bold text-white 
                       bg-green-600 rounded-full"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin size-2" />
                      ) : (
                        cartCount
                      )}
                    </span>
                  </div>

                  <span className="font-medium dark:text-gray-50 text-gray-700">
                    Cart
                  </span>
                </div>
              </Link>

              <Link
                href="/profile"
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-gray-600 flex items-center justify-center relative">
                    <FaUser className="text-gray-400" />
                  </div>

                  <span className="font-medium dark:text-gray-50 text-gray-700">
                    {session.data.user.name}
                  </span>
                </div>
              </Link>
              <Button
                onClick={() => {
                  signOut({ callbackUrl: "/api/auth/signin" });
                 
                }}
                className="w-full flex justify-baseline p-6 text-center  texy-gray-600  hover:bg-green-50 dark:hover:bg-gray-700 dark:text-white dark:hover:text-red-600 hover:text-red-600 transition-colors"
              >
                <FaSignOutAlt /> Sign Out
              </Button>
              
            </div>
          ) : (
            <div className="p-4 space-y-1">
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* Sign In Button */}
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                >
                  Sign In
                </Link>

                {/* Sign Up Button */}
                <Link
                  href="/register"
                  className="flex items-center justify-center px-4 py-3 rounded-xl border-2 border-green-600 text-green-600 
                  dark:text-green-400 dark:border-green-400 hover:bg-green-50 dark:hover:bg-gray-800 transition"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          <div className="mx-4 border-t border-gray-300"></div>

          {/* Footer buttons */}

          <Link
            className="mx-4 mt-2 p-4 rounded-xl dark:bg-gray-800 bg-gray-50 border border-gray-100 dark:border-gray-600  flex items-center gap-3 hover:bg-green-50 transition-colors"
            href={"/contact"}
          >
            {/* Icon Circle */}
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <FaHeadset className="text-green-600" />
            </div>

            <div>
              <div className="text-sm font-semibold dark:text-gray-50 text-gray-700">
                Need Help?
              </div>
              <div className="text-sm text-green-600">Contact Support</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
