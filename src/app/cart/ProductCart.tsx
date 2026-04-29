import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/interfaces/cart/CartProduct";
import { formatPrice } from "@/lib/utils";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function ProductCart({
  item,
  removeItem,
  updateProductCount,
}: {
  item: CartProduct;
  removeItem: (productId: string) => Promise<void>;
  updateProductCount: (productId: string, count: number) => Promise<void>;
}) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdatinig, setIsUpdating] = useState(false);
  const [isIncrease, setIsIncrease] = useState(false);
  const [isDecrease, setIsDecrease] = useState(false);

  async function handleRemoveItem() {
    setIsRemoving(true);
    await removeItem(item.product._id);
    setIsRemoving(false);
  }

  async function handleUpdateItem(count: number) {
    if (count > item.count) {
      setIsIncrease(true);
    } else {
      setIsDecrease(true);
    }
    setIsUpdating(true);
    await updateProductCount(item.product._id, count);
    setIsUpdating(false);
    setIsIncrease(false);
    setIsDecrease(false);
  }
  return (
    <div
      className="flex flex-col sm:flex-row gap-4 rounded-xl border border-gray-200 dark:border-gray-700 
bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition w-full overflow-hidden"
    >
      {/* Image */}
      <div className="w-full sm:w-24 shrink-0">
        <AspectRatio
          ratio={1}
          className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between w-full">
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
          {item.product.title}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <Button size="icon" className="size-8">
            <Minus className="size-3" />
          </Button>

          <span className="w-8 text-center">{item.count}</span>

          <Button size="icon" className="size-8 bg-green-500">
            <Plus className="size-3" />
          </Button>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col sm:items-end justify-between w-full sm:w-auto">
        <div className="text-left sm:text-right">
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(item.price * item.count)}
          </p>
          <p className="text-sm text-gray-500">
            {formatPrice(item.price)} each
          </p>
        </div>

        <Button className="w-full sm:w-auto text-red-500">Remove</Button>
      </div>
    </div>
  );
}
