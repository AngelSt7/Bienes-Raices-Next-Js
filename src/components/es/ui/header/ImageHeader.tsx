'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function ImageHeader() {
    const path = usePathname()
    const isIndex = path === '/es'
    const textRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        gsap.context(() => {
            const letters = gsap.utils.toArray(".letter");

            gsap.set(letters, {
                opacity: 0,
                y: 50
            });

            gsap.set(subtitleRef.current, {
                opacity: 0,
                y: 20
            });

            const tl = gsap.timeline();

            tl.to(letters, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1
            });

            tl.to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
        });
    }, []);

    if (isIndex) return (
        <div className="w-full h-[calc(100vh-4rem)]">
            <div className="flex-1 relative h-full">
                <div className="absolute inset-0 bg-black/30 z-[5]" />
                <Image
                    src={'/Header.jpg'}
                    fill
                    priority
                    alt="Imagen Bienes Raices"
                    className="object-cover"
                />
                <div className=" w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                    <h1 
                        ref={textRef}
                        className="text-6xl font-light tracking-wider text-white mb-2"
                    >
                        {Array.from("INMOANDES").map((char, index) => (
                            <span
                                key={index}
                                className="letter inline-block"
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-gray-200 text-xl font-light tracking-wide"
                    >
                        Alquila o vende casas, departamentos y más
                    </p>
                </div>
            </div>
        </div>
    );
}