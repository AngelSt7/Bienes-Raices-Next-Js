import Link from 'next/link'
import React from 'react'

type LinksProps = {
    href: string
    message: string
    label: string
}

export default function LinkToAuth({ href, message, label }: LinksProps) {
  return (
    <p className='text-center font-normal text-sm cursor-pointer text-zinc-500'>
      {message}{' '}
      <Link href={href} className='font-medium text-amber-500'>
        {label}
      </Link>
    </p>
  )
}
