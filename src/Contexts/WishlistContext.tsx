"use client";
import apiServices from "@/services/api";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const wishListContext = createContext({
  wishlistCount: 0,
  setWishlistCount: (v: any) => {},
  wishlistIds: [] as string[],
  setWishlistIds: (v: any) => {},
  isLoading: true,
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  async function getWishlist() {
    setIsLoading(true);
    const res = await apiServices.getWishlist();

    setWishlistCount(res.count);

    //  store ONLY ids
    const ids = res.data.map((item: any) => item._id);
    setWishlistIds(ids);

    setIsLoading(false);
  }

  useEffect(() => {
    //  only run when logged in
    if (status === "authenticated") {
      getWishlist();
    }

    //  reset when logged out
    if (status === "unauthenticated") {
      setWishlistCount(0);
      setWishlistIds([]);
    }
  }, [status]);

  return (
    <wishListContext.Provider
      value={{
        wishlistCount,
        setWishlistCount,
        wishlistIds,
        setWishlistIds,
        isLoading,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
