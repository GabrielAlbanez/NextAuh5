"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { PersonIcon } from "@radix-ui/react-icons"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { userCurrentUser } from "@/hooks/user-current-user";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserButton = () => {

  
   

  const user = userCurrentUser();

  const navigation = useRouter()

  const onClick = () => {
    signOut()
  };

  const navigationPush=(route : string)=>{
    navigation.push(route)
  }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} className="object-cover" />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className="w-40" align="end">
        <DropdownMenuItem onClick={()=>{navigationPush("/settings")}} className="cursor-pointer">
          <HamburgerMenuIcon className="h-4 w-4 mr-2" onClick={()=>{navigationPush("/settings")}} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{navigationPush("/Data")}} className="cursor-pointer">
          <PersonIcon className="h-4 w-4 mr-2" onClick={()=>{navigationPush("/Data")}} />
          Your Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClick} className="cursor-pointer">
          <ExitIcon className="h-4 w-4 mr-2" onClick={onClick} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>


    </DropdownMenu>
  );
};