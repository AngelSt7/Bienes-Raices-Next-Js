import Image from 'next/image'
import React from 'react'

export default function Logo({logo} : { logo: string }) {
    return (
        <Image src={logo} alt='Logo Bienes Raices' width={40} height={30} priority />
    )
}
