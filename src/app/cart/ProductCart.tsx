import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { CartProduct } from '@/interfaces/cart/CartProduct'
import { formatPrice } from '@/lib/utils'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function ProductCart({ item, removeItem, updateProductCount }: {
    item: CartProduct;
    removeItem: (productId: string) => Promise<void>;
    updateProductCount: (productId: string, count: number) => Promise<void>
}) {
    const [isRemoving, setIsRemoving] = useState(false)
    const [isUpdatinig, setIsUpdating] = useState(false)
    const [isIncrease, setIsIncrease] = useState(false)
    const [isDecrease, setIsDecrease] = useState(false)

    async function handleRemoveItem() {
        setIsRemoving(true)
        await removeItem(item.product._id)
        setIsRemoving(false)
    }

    async function handleUpdateItem(count: number) {
        if (count > item.count) {
            setIsIncrease(true)
        } else {
            setIsDecrease(true)
        }
        setIsUpdating(true)
        await updateProductCount(item.product._id, count)
        setIsUpdating(false)
        setIsIncrease(false)
        setIsDecrease(false)


    }
    return (
        <div
            className="flex gap-4 rounded-xl border border-gray-200 dark:border-gray-700 
             bg-white dark:bg-gray-900 
             p-4 shadow-sm hover:shadow-md transition"
        >
            {/* Image */}
            <div className="w-24 shrink-0">
                <AspectRatio ratio={1} className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="size-full object-cover hover:scale-105 transition"
                    />
                </AspectRatio>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between">

                {/* Title */}
                <div>
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                        {item.product.title}
                    </h3>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-2">
                    <Button
                        variant="outline"
                        disabled={item.count === 1 || isUpdatinig}
                        size="icon"

                        onClick={() => { handleUpdateItem(item.count - 1) }}

                        className="size-8 rounded-lg"
                    >
                        {isDecrease ?
                            <Loader2 className="animate-spin size-3" />
                            :
                            <Minus className="size-3" />}
                    </Button>

                    <span className="w-8 text-center font-medium">
                        {item.count}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        disabled={isUpdatinig}
                        onClick={() => {
                            handleUpdateItem(item.count + 1)
                        }}
                        className="size-8 bg-green-500 rounded-lg"
                    >


                        {isIncrease ?
                            <Loader2 className="animate-spin size-3" />
                            :
                            <Plus className="size-3" />}
                    </Button>
                </div>
            </div>

            {/* Price + Actions */}
            <div className="flex flex-col items-end justify-between">

                <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(item.price * item.count)}
                    </p>
                    <p className="text-sm text-gray-500">
                        {formatPrice(item.price)} each
                    </p>
                </div>

                <Button
                    variant="ghost"
                    disabled={isRemoving}
                    size="sm"
                    onClick={handleRemoveItem}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                    {isRemoving ? (
                        <FaSpinner className="mr-1 size-4 animate-spin" />
                    ) : (
                        <Trash2 className="mr-1 size-4" />
                    )}
                    Remove
                </Button>

            </div>
        </div>
    )
}
