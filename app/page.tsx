import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'
import AvatarImg from "@/assets/img/image - Copia.jpg"

export default function Home() {
  return (
    <main className={cn("flex h-screen m-w-screen  items-center justify-between ", font.className)}>

      <div className="relative w-full h-full">
        <Image src={AvatarImg} alt='avatarImg' className='absolute inset-0 w-full h-full  object-cover opacity-15 '/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className=" text-2xl text-center md:text-5xl md:pb-14">Bem-vindo à galeria da Disney!</h1>
        </div>
        </div>
  
    </main>
  )
}
