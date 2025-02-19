'use client'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { RxHamburgerMenu } from "react-icons/rx";
import { Home, User as UserIcon, ShoppingBag, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link'
import Switcher from '../../ui/darkMode/SwitchMode';

export default function Menu() {

    return (
        <Popover className="relative z-50 ">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-transparent">
                <RxHamburgerMenu className='w-10 h-10 text-slate-800 dark:text-slate-50 bg-[#F5F5F5] dark:bg-[#181818] p-1 rounded-xl'/>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex max-w-min -translate-x-48">
                    <div className="w-56 shrink rounded-xl bg-white dark:bg-[#181818] p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <>
                            <p className='text-center dark:text-slate-200 text-zinc-800'>Hola: Tu nombre</p>
                            <Link
                                href='/es'
                                className='dark:text-slate-300 dark:hover:text-slate-50 text-zinc-600 flex items-center p-2 hover:text-zinc-950 gap-2'
                            >
                                <Home size={18} />
                                Inicio
                            </Link>
                            <Link
                                href='/es/profile'
                                className='dark:text-slate-300 dark:hover:text-slate-50 text-zinc-600 p-2 flex items-center hover:text-zinc-950 gap-2'
                            >
                                <UserIcon size={18} />
                                Mi Perfil
                            </Link>
                            <Link
                                href='/es/purchases'
                                className='dark:text-slate-300 dark:hover:text-slate-50 text-zinc-600 p-2 flex items-center hover:text-zinc-950 gap-2'
                            >
                                <ShoppingBag size={18} />
                                Mis Compras
                            </Link>
                            <button
                                className='dark:text-slate-300 dark:hover:text-slate-50 text-zinc-600 p-2 flex items-center hover:text-zinc-950 focus:outline-none focus:ring-0 gap-2 w-full'
                                type='button'
                            >
                                <LogOut size={18} />
                                Cerrar Sesión
                            </button>
                            <div className='mt-2'>
                                <Switcher />
                            </div>
                        </>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}