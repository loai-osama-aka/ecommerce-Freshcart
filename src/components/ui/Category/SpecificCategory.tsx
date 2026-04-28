import { Category } from '@/interfaces/Category'
import Link from 'next/link'
import React from 'react'

export default function SpecificCategory({specificCategory}:{specificCategory:Category}) {
  return (
    <div>
        <div className='px-4 py-10 sm:py-12 bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white'>
                <div className='container mx-auto px-4 py-10 sm:py-12'>
                    <nav className='flex items-center gap-2 text-sm text-white/70 mb-6'>
                        <Link href={'/'} className='hover:text-white transition-colors duration-200'>Home</Link>
                        <span className='text-white/40'>/</span>
                        <Link href={'/categories'} className='hover:text-white transition-colors duration-200'>Category</Link>
                        <span className='text-white/40'>/</span>
                        <span className='text-white font-medium'>{specificCategory.name}</span>
                    </nav>
                    <div className="flex items-center gap-5">

                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">

                            <img src={specificCategory.image} alt={specificCategory.slug} className="w-12 h-12 object-contain" />
                        </div>

                        {/* Text */}
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white dark:text-gray-100">
                                {specificCategory.name}
                            </h1>
                            <p className="text-white/80  mt-1">
                                Choose a subcategory to browse products
                            </p>
                        </div>

                    </div>
                </div>
            </div>
      
    </div>
  )
}
