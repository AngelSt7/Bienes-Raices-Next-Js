'use client'
import CurrencyFilter from '@/src/components/es/search/fitlerSearchs/CurrencyFilter'
import Filters from '@/src/components/es/search/fitlerSearchs/Filters'
import SelectFilter from '@/src/components/es/search/fitlerSearchs/SelectFilter'
import React from 'react'

export default function layout({ children }: { children: { children: React.ReactNode } }) {
    return (
        <>
            <div className="flex items-center gap-4 bg-white dark:bg-transparent p-2 ">
                <div className='w-11/12 max-w-[1400px] mx-auto'>
                    <Filters />
                </div>
            </div>
            {children}
        </>
    )
}
