'use client'
import Switcher from "@/src/components/ui/darkMode/SwitchMode";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Image } from "@heroui/react";
import { useState } from "react";
import { LogoInmoAndes } from "./Logo";

export default function HeaderNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "Profile", "Dashboard",
        "Activity", "Analytics",
        "System", "Deployments",
        "My Settings", "Team Settings",
        "Help & Feedback", "Log Out"
    ];
    return (
        <Navbar maxWidth="full" isBordered onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className="relative flex gap-2 items-center">
                    <LogoInmoAndes />
                    <p className="font-bold text-inherit uppercase">InmoAndes</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Propiedades
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        Contacto
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Nosotros
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Iniciar Sesión
                    </Button>
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Switcher />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
