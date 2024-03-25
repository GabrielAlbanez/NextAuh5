"use client";
import React from "react";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Logoo from "@/assets/img/Disney_Plus_logo.svg.png";
import Image from "next/image";
import { LoginButton } from "./auth/login-button";
import { Button } from "./ui/button";
import { userCurrentUser } from "@/hooks/user-current-user";
import { UserInfo } from "./user-info";
import { UserButton } from "./auth/user-button";

export default function Navbar() {
    const local = usePathname();

    const user = userCurrentUser()



    return (
        <div className="">
            {local == "/auth/login" || local == "/auth/register" ? (
                <></>
            ) : (
                <div className=" px-5 sm:px-5 md:px-16 py-4 w-screen bg-transparent fixed z-10 ">
                    <nav className="flex items-center justify-between sm:justify-between">
                        <div className="flex items-center gap-3 sm:gap-12">
                            <picture className=" w-[80px] sm:w-[100px]">
                                <Link href={"/"}>
                                <Image src={Logoo} alt="logo" width={100} height={100} />
                                </Link>
                            </picture>
                            <p className="pt-2 sm:pt-4">galeria</p>
                        </div>
                        <div>
                            {!user ? (<>   <LoginButton >
                                <Button variant="secondary" size="lg">Sign in</Button>
                            </LoginButton></>) : (<>
                                <UserButton />
                            </>)}
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
}