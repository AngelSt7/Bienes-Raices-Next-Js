import Footer from '@/src/components/es/ui/footer/Footer'
import HeaderNavigation from '@/src/components/es/ui/header/HeaderNavigation'
import ImageHeader from '@/src/components/es/ui/header/ImageHeader'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <div className=' min-h-screen flex flex-col'>
      <HeaderNavigation session={session} />
      <ImageHeader />
      <main className=' flex flex-col flex-1 h-full'>
        {children}
      </main>
      <Footer
      />
    </div>
  )
}
