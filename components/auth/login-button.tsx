"use client"

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children : React.ReactNode;
    mode? : "modal" | "redirect";
    asChild? : boolean
}

export const LoginButton = ({
    children,
    mode,
    asChild
} : LoginButtonProps)=>{
 
    const navigation = useRouter()

    const clickButton = ()=>{
        navigation.push("/auth/login")
    }

    if(mode === "modal"){
        return (
            <span>
                todo : implement modal
            </span>
        )
    }

    return (
        <span onClick={clickButton} className="cursor-pointer">
            {children} 
        </span>
    )



}