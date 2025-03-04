'use client'
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Home, User as UserIcon, ShoppingBag, LogOut, Heart } from 'lucide-react';
import Link from 'next/link';
import Switcher from '../../ui/darkMode/SwitchMode';
import { signOut } from 'next-auth/react';

const links = [
    {
        href: '/es',
        label: 'Página Principal',
        icon: <Home size={18} />,
        target: '_blank',
        rel: 'noopener noreferrer',
    },
    {
        href: '/dashboard/profile',
        label: 'Mi Perfil',
        icon: <UserIcon size={18} />,
    },
    {
        href: '/dashboard/properties?page=1',
        label: 'Mis Propiedades',
        icon: <ShoppingBag size={18} />,
    },
    {
        href: '/dashboard/favorites',
        label: 'Mis Favoritos',
        icon: <Heart size={18} />,
    },
];

export default function Menu() {

    return (
        <Popover className="relative z-50 ">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-transparent">
                <RxHamburgerMenu className='w-10 h-10 text-slate-800 dark:text-slate-50 bg-[#F5F5F5] dark:bg-[#181818] p-1 rounded-xl' />
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
                            {links.map(({ href, label, icon, target, rel }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className='dark:text-slate-300 dark:hover:text-slate-50 text-zinc-600 flex items-center p-2 hover:text-zinc-950 gap-2'
                                    target={target}
                                    rel={rel}
                                >
                                    {icon} {label}
                                </Link>
                            ))}
                            <button
                                onClick={() => signOut({ callbackUrl: '/es' })}
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