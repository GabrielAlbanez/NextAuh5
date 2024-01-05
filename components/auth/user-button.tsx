"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

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
import { signOut } from "next-auth/react";

export const UserButton = () => {
  const user = userCurrentUser();

  const onClick = () => {
    signOut()
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={onClick}  className="w-40" align="end">
          <DropdownMenuItem onClick={onClick} className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" onClick={onClick}  />
            Logout
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};