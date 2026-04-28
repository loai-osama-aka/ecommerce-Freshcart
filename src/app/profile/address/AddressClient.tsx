'use client'

import { useState } from "react"
import AddressCard from "@/components/ui/addressComponents/AddressCard"
import AddAddressModal from "@/components/ui/addressComponents/AddAddressModal"
import AddAddress from "./AddAddress"
import EmptyAddresses from "./EmptyAddresses"
import { Address } from "@/interfaces/Address/Address"

export default function AddressClient({ addresses }: { addresses: Address[] }) {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

    return (
        <>
            <AddAddress
                onAdd={() => {
                    setSelectedAddress(null)
                    setIsOpen(true)
                }}
            />

            {addresses.length === 0 ? (
                <EmptyAddresses />
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {addresses.map((address) => (
                        <AddressCard
                            key={address._id}
                            address={address}
                            onEdit={(addr) => {
                                setSelectedAddress(addr)
                                setIsOpen(true)
                            }}
                        />
                    ))}
                </div>
            )}

            <AddAddressModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                address={selectedAddress}
            />
        </>
    )
}