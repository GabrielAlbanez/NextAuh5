import React from 'react'
import Logo from "@/assets/img/Disney_Plus_logo.svg.png"
import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full flex flex-col gap-12 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900'>
            

             <Image src={Logo} alt='logo'  width={150} height={150}/>
            {children}</div>
    )
}

export default AuthLayout