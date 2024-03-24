"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { patchFetch } from 'next/dist/server/app-render/entry-base'
import { UserButton } from '@/components/auth/user-button'

function Navbar() {

  const pahtName = usePathname()




  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-2xl  w-[600px] shadow-sm '>
      <div className='flex gap-x-2'>
        <Button asChild variant={pahtName === "/settings" ? "default" : "outline"}>
          <Link href={"/settings"}>Settings</Link>
        </Button>
        <Button asChild variant={pahtName === "/server" ? "default" : "outline"}>
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button asChild variant={pahtName === "/admin" ? "default" : "outline"}>
          <Link href={"/admin"}>admin</Link>
        </Button>
      </div>
      
      <UserButton />
    </nav>
  )
}

export default Navbar