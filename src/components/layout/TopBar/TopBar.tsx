import { FaTruck, FaGift, FaPhone, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { FiMail, FiUser } from "react-icons/fi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';

export default function TopBar() {

    const session = useSession()
    return (
        <div className="hidden p-1 lg:block text-sm border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-10">

                    {/* Left side */}
                    <div className="flex items-center gap-6 text-gray-500">

                        <span className="flex items-center gap-2">
                            <FaTruck className="text-green-600 text-xs" />
                            <span>Free Shipping on Orders 500 EGP</span>
                        </span>

                        <span className="flex items-center gap-2">
                            <FaGift className="text-green-600 text-xs" />
                            <span>New Arrivals Daily</span>
                        </span>

                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-6">

                        {/* Contact */}
                        <div className="flex items-center gap-4 text-gray-500">

                            <a
                                href="tel:+18001234567"
                                className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                            >
                                <FaPhone className="text-xs" />
                                <span>+1 (800) 123-4567</span>
                            </a>

                            <a
                                href="mailto:support@freshcart.com"
                                className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                            >
                                <FiMail className="text-xs" />
                                <span>support@freshcart.com</span>
                            </a>

                        </div>

                        {/* Divider */}
                        <span className="w-px h-4 bg-gray-200"></span>

                        {/* Auth */}
                        {session.status == "authenticated" ?
                            <>
                                <Link
                                    href={'/profile'}
                                    className="flex items-center gap-3 px-4 py-2.5 text-lg text-gray-600  hover:text-green-600 transition"
                                >
                                    <FiUser />
                                    {session.data.user.name}
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/api/auth/signin' })}
                                    className=" flex items-center gap-3  text-gray-600 text-lg    hover:text-red-600 transition-colors">
                                        <FaSignOutAlt />
                                        Sign Out</button>
                            </> : <div className="flex items-center gap-4">

                                <Link
                                    href="/auth/login"
                                    className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
                                >
                                    <FiUser className="text-sm" />
                                    <span>Sign In</span>
                                </Link>

                                <Link
                                    href="/auth/register"
                                    className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
                                >
                                    <FaUserPlus className="text-sm" />
                                    <span>Sign Up</span>
                                </Link>

                            </div>}

                    </div>
                </div>
            </div>
        </div>
    );
}