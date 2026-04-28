"use client";
import { Address } from "@/interfaces/Address/Address";
import apiServices from "@/services/api";
import { MapPin, Phone, Building2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddressCard({
  address,
  onEdit,
}: {
  address: Address;
  onEdit: (address: Address) => void;
}) {
  const router = useRouter();

  async function deleteAddress(addressId: string) {
    const response = await apiServices.deleteAddress(addressId);
    toast.success(response.message);
    router.refresh();
    console.log(response);
  }
  return (
    <div
      className="
        bg-white dark:bg-gray-900 
        border border-gray-100 dark:border-gray-800 
        rounded-2xl p-5 
        shadow-sm hover:shadow-md 
        hover:border-green-200 dark:hover:border-green-700
        transition-all duration-200 group
      "
    >
      <div className="flex items-start justify-between gap-4">
        {/* LEFT CONTENT */}
        <div className="flex gap-4 flex-1">
          {/* ICON */}
          <div
            className="
              w-11 h-11 rounded-xl 
              bg-green-50 dark:bg-green-900/30 
              flex items-center justify-center
              group-hover:bg-green-100 dark:group-hover:bg-green-800/40
              transition
            "
          >
            <MapPin className="text-green-600 dark:text-green-400" size={18} />
          </div>

          {/* TEXT */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              {address.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {address.details}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Phone size={14} />
                {address.phone}
              </span>

              <span className="flex items-center gap-1.5">
                <Building2 size={14} />
                {address.city}
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {/* Edit */}
          <button
            onClick={() => onEdit(address)}
            className="
              w-9 h-9 rounded-lg 
              bg-gray-100 dark:bg-gray-800 
              text-gray-600 dark:text-gray-300
              hover:bg-green-100 hover:text-green-600
              dark:hover:bg-green-900/30 dark:hover:text-green-400
              flex items-center justify-center transition
            "
          >
            <Pencil size={16} />
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this address?")) {
                deleteAddress(address._id);
              }
            }}
            className="
              w-9 h-9 rounded-lg 
              bg-gray-100 dark:bg-gray-800 
              text-gray-600 dark:text-gray-300
              hover:bg-red-100 hover:text-red-600
              dark:hover:bg-red-900/30 dark:hover:text-red-400
              flex items-center justify-center transition
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
