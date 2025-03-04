import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Image } from '@heroui/image';
import { LogoInmoAndes } from '../header/Logo';

export default function Footer() {
    return (
        <footer className="w-full py-12 bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="flex flex-col space-y-4">
                        <div className=' flex items-center'>

                            <LogoInmoAndes />
                            <p className="font-bold text-inherit uppercase">InmoAndes</p>
                        </div>
                        <p className="text-sm mt-2">
                            Tu socio confiable en bienes raíces. Encontramos el hogar perfecto para cada familia.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span className="text-sm">+51 933 897 816</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">santacruza2000@gmail.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">Lima, Perú</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">Lun - Sab: 9:00 - 18:00</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/propiedades" className="text-sm hover:underline">Propiedades</a>
                            </li>
                            <li>
                                <a href="/nosotros" className="text-sm hover:underline">Nosotros</a>
                            </li>
                            <li>
                                <a href="/servicios" className="text-sm hover:underline">Servicios</a>
                            </li>
                            <li>
                                <a href="/blog" className="text-sm hover:underline">Blog</a>
                            </li>
                            <li>
                                <a href="/contacto" className="text-sm hover:underline">Contacto</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Twitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">
                            © {new Date().getFullYear()} InmoAndes. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="/privacidad" className="text-sm hover:underline">
                                Política de Privacidad
                            </a>
                            <a href="/terminos" className="text-sm hover:underline">
                                Términos y Condiciones
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
