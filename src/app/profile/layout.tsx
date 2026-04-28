'use client'
import Link from "next/link"
import { ReactNode } from "react"
import { MapPin, Settings, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import AddressHeader from "@/components/ui/addressComponents/AddressHeader"
import { usePathname } from "next/navigation"

export default function ProfileLayout({ children }: { children: ReactNode }) {
    const pathName = usePathname()
    console.log(pathName);

    const links = [
        {
            name: 'My Address',
            href: '/profile/address',
            icon: <MapPin size={16} />
        },
        {
            name: 'Settings',
            href: '/profile/settings',
            icon: <Settings size={16} />

        }
    ]
    return (

        <div >
            <AddressHeader />
            <div className=" mx-auto px-4 py-8 bg-white dark:bg-gray-900 ">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <nav className="rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                                <h2 className="font-bold text-gray-900 dark:text-white">
                                    My Account
                                </h2>
                            </div>

                            {/* Links */}
                            <ul className="p-2 space-y-1">
                                {
                                    links.map((link) => {
                                        const isActive =  link.href == pathName

                                        return (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",

                                                        // ✅ ACTIVE
                                                        isActive
                                                            ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",

                                                            // ✅ ACTIVE ICON BG
                                                            isActive
                                                                ? "bg-green-500 text-white"
                                                                : "bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                                                        )}
                                                    >
                                                        {link.icon}
                                                    </div>

                                                    <span className="font-medium flex-1">{link.name}</span>

                                                    <ChevronRight
                                                        size={14}
                                                        className={cn(
                                                            "transition-colors",
                                                            isActive ? "text-green-500" : "text-gray-400"
                                                        )}
                                                    />
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                                {/* Addresses */}
                                {/* <li>
                                    <Link
                                        href="/profile/address"
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                            "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                                        )}
                                    >
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-500 text-white">
                                            <MapPin size={16} />
                                        </div>

                                        <span className="font-medium flex-1">My Addresses</span>

                                        <ChevronRight size={14} className="text-primary-500" />
                                    </Link>
                                </li> */}

                                {/* Settings */}
                                {/* <li>
                                    <Link
                                        href="/profile/settings"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                                            <Settings size={16} />
                                        </div>

                                        <span className="font-medium flex-1">Settings</span>

                                        <ChevronRight size={14} className="text-gray-400" />
                                    </Link>
                                </li> */}

                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    )
}