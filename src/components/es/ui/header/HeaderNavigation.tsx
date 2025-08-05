'use client'

import Switcher from "@/src/components/ui/darkMode/SwitchMode";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, ButtonGroup } from "@heroui/react";
import { useState } from "react";
import { LogoInmoAndes } from "./Logo";
import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from 'next-auth/react';
import { usePathname } from "next/navigation";

type HeaderNavigationProps = {
    session?: Session | null
}

export default function HeaderNavigation({ session }: HeaderNavigationProps) {
    const path = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: 'inicio', link: '/es' },
        { label: 'propiedades', link: '/es/search' },
        { label: 'contacto', link: '/es/contact' },
        { label: 'preguntas', link: '/es/fqa' },
    ];

    const navItems = [
        { link: '/es/search', label: 'Propiedades' },
        { link: '/es/contact', label: 'Contacto' },
        { link: '/es/fqa', label: 'Preguntas' },
    ];

    return (
        <Navbar maxWidth="full" isBordered onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
                <NavbarBrand className="relative flex gap-2 items-center">
                    <Link href={'/'} className=" cursor-pointer flex items-center gap-2">
                        <div className=" hidden xs:flex">
                            <LogoInmoAndes />
                        </div>
                        <p className="font-bold text-inherit uppercase">InmoAndes</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-4">
                {navItems.map(({ link, label }) => (
                    <NavbarItem key={link} className="min-w-[100px] text-center">
                        <Link className={path.startsWith(link) ? 'text-red-700 dark:text-blue-600 font-semibold' : ''} href={link} prefetch={true}>
                            {label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                {session ? (
                    <>
                        <NavbarItem className="block">
                            <ButtonGroup>
                                <Button className="capitalize" size="sm" as={Link} color="warning" href="/dashboard/properties?page=1" variant="flat">
                                    Mi Perfil
                                </Button>
                                <Button className="capitalize" size="sm" as={Link} color="danger" href="#" variant="flat"
                                    onPress={() => signOut({ callbackUrl: '/es' })}>
                                    Cerrar Sesión
                                </Button>
                            </ButtonGroup>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem>
                            <Button size="sm" as={Link} color="warning" href="/auth/login" variant="flat">
                                Iniciar Sesión
                            </Button>
                        </NavbarItem>
                    </>
                )}
                <NavbarItem className=" hidden md:block">
                    <Switcher />
                </NavbarItem>
            </NavbarContent >
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className={`${path === item.link ? 'text-red-700 dark:text-blue-600 font-semibold' : ''} w-fit capitalize text-large`}
                            href={item.link}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {session && (
                    <>
                        <Link
                            className="w-full capitalize text-large"
                            href={'/dashboard/properties?page=1'}
                        >
                            Dashboard
                        </Link>
                        <button
                            className="w-full capitalize text-large"
                            onClick={() => signOut({ callbackUrl: '/es' })}
                        >
                            Cerrar Sesión
                        </button>
                    </>
                )}
                <Switcher />
            </NavbarMenu>
        </Navbar >
    )
}
