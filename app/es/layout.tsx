import HeaderNavigation from '@/src/components/es/ui/header/HeaderNavigation'
import React from 'react'

export default function layout({ children } :  { children : React.ReactNode }) {
  return (
    <>
      <HeaderNavigation />
      {children}
    </>
  )
}
