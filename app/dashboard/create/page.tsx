'use client'

import {signOut} from 'next-auth/react'
import {useSession} from 'next-auth/react'
// import {getServerSession} from 'next-auth/next' para servidor

export default function page() {

  // useSession()
  return (
    <div>
        <h1 className=' text-red-600 text-6xl'>Dashboard</h1>
        <button className=' bg-slate-950 text-white px-4 py-2'
          onClick={()=>signOut()}
          >
          Logout
        </button>
    </div>
  )
}
