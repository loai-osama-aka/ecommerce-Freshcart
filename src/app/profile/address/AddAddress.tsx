'use client'
import AddAddressModal from '@/components/ui/addressComponents/AddAddressModal'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function AddAddress({ onAdd }: { onAdd: () => void }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <div className='flex items-center justify-between mb-6'>
                <div className="mb-6 ml-6">
                    <h2 className="text-xl font-bold dark:text-white text-gray-900">Account Settings</h2>
                    <p className="text-gray-500 text-sm mt-1">Update your profile information and change your password</p>
                </div>
                <button
                    className="
                                inline-flex items-center gap-2 
                                px-5 py-2.5 rounded-xl 
                             bg-green-600 text-white font-semibold
                             hover:bg-green-700 
                                transition-all duration-200 
                             shadow-lg shadow-green-600/25
                             hover:shadow-green-600/40
                             active:scale-[0.97]
                             dark:bg-green-500 
                             dark:hover:bg-green-600
                             dark:shadow-green-500/20
                              "
                    onClick={onAdd}
                >
                    <Plus size={16} />
                    Add Address
                </button>
            </div>
            <AddAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </>
    )
}
