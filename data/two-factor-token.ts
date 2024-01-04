import { db } from "@/lib/db";

export const getTokenFactorByToken = async(token : string)=>{
   
    try {

        const twoFactorToken = await db.twoFactorToken.findUnique({
            where : {token : token}
        })

        return twoFactorToken
        
    } catch (error) {
         return null
    }

}

export const getTokenFactorByEmail = async(email : string)=>{
   
    try {

        const twoFactorToken = await db.twoFactorToken.findFirstOrThrow({
            where : {email : email}
        })

        return twoFactorToken
        
    } catch (error) {
         return null
    }

}