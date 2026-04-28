'use client'

import { useEffect, useState, useContext } from "react";

import { wishListContext } from "@/Contexts/WishlistContext";
import InnerWishlist from "./InnerWishlist";
import EmptyWishlist from "./EmptyWishlist";
import { WishlistProduct } from "@/interfaces/wishlist/WishlistProduct ";

export default function WishlistClient({ initialData }: { initialData: WishlistProduct[] }) {

  const [items, setItems] = useState(initialData);
  const { setWishlistCount } = useContext(wishListContext);

  // ✅ sync navbar count
  useEffect(() => {
    setWishlistCount(items.length);
  }, [items]);

  function handleRemove(id: string) {
    setItems(prev => prev.filter(item => item._id !== id));
  }

  // ✅ THIS FIXES YOUR PROBLEM
  if (items?.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {items.map(item => (
        <InnerWishlist
          key={item._id}
          item={item}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}