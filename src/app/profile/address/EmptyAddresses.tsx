"use client";

import AddAddressModal from "@/components/ui/addressComponents/AddAddressModal";
import { useState } from "react";
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";

export default function EmptyAddresses() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 p-10 md:p-12 text-center">

                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-5">
                    <FaMapMarkerAlt className="text-3xl text-gray-400 dark:text-gray-500" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    No Addresses Yet
                </h3>

                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto leading-relaxed">
                    Add your first delivery address to make checkout faster and easier.
                </p>

                {/* Button */}
                <button
                onClick={()=>{setIsOpen(true)}}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-600/25 active:scale-95">
                    <FaPlus />
                    Add Your First Address
                </button>

            </div>
            <AddAddressModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>

    );
}