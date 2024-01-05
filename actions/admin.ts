"use server"

import { currentRole } from "@/data/auth"
import { UserRole } from "@prisma/client"

export const admin = async()=>{
    const role = await currentRole()

    if(role !== UserRole.ADMIN){
        return {error : "vc precisa ser adm"}
    } else {
        return {success : "bem vindo adm"}
    }
}