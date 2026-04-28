"use client"
import TopBar from '@/components/layout/TopBar/TopBar'
import CartContextProvider from '@/Contexts/CartContext'
import WishlistContextProvider from '@/Contexts/WishlistContext'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Provider store={store} >
            
            <SessionProvider>
                <TopBar />
                <WishlistContextProvider>
                <CartContextProvider>
                    {children}
                </CartContextProvider>
                </WishlistContextProvider>
            </SessionProvider>
        </Provider>
        </>
    )
}
