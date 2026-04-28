"use client";
import apiServices from "@/services/api";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const cartContext = createContext<{
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
}>({
  cartCount: 0,
  setCartCount: () => {},
  isLoading: true,
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  async function getCartCount() {
    setIsLoading(true);
    const res = await apiServices.getUserCart();
    setCartCount(res.numOfCartItems);
    setIsLoading(false);
  }
 
  useEffect(() => {
    // ✅ only run when user is authenticated
    if (status === "authenticated") {
      getCartCount();
    }

    // ✅ reset when logged out
    if (status === "unauthenticated") {
      setCartCount(0);
    }
  }, [status]); // 🔥 IMPORTANT


  return (
    <cartContext.Provider value={{ cartCount, setCartCount, isLoading }}>
      {children}
    </cartContext.Provider>
  );
}
