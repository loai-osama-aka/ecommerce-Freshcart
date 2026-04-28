import Link from 'next/link'
import React from 'react'
import { FaBoxOpen, FaChevronRight, FaHome } from 'react-icons/fa'

export default function AllProductsHeader() {
  return (
    <div className="bg-linear-to-br pb-5 from-emerald-600 via-green-500 to-lime-400 text-white rounded-b-3xl shadow-lg">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <FaHome />
              Home
            </Link>

            <FaChevronRight className="text-white/40 text-xs" />

            <Link href="/products" className="hover:text-white">
              Products
            </Link>


           
          </nav>

          {/* Header Content */}
          <div className="flex items-center gap-5">
            {/* Icon Box */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
             
              
                <FaBoxOpen className="size-10" />
              
            </div>

            {/* Text */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Products
              </h1>

              <p className="text-white/80 mt-1">
                Discover all available products
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}
