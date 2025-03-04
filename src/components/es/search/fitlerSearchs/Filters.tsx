'use client'
import React from 'react'
import SelectFilter from './SelectFilter'
import CurrencyFilter from './CurrencyFilter'
import BedroomFilter from './BedroomFilter'
import ModalFilterts from './modal/ModalFilterts'

export default function Filters() {
    return (
        <div className="bg-white dark:bg-transparent p-2 rounded-xl">
            <div className='hidden md:flex items-center justify-center w-11/12 max-w-[1400px] mx-auto gap-4'>
                <SelectFilter />
                <CurrencyFilter />
                <BedroomFilter />
            </div>
            <div className=' flex md:hidden'>
                <ModalFilterts />
            </div>
        </div>
    )
}
