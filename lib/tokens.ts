import crypto from "crypto"
import { getVerificationTokenByEmail } from "@/data/verificantion-token"
import { v4 as uuidv4 } from "uuid"
import { db } from "./db"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"
import { getTokenFactorByEmail } from "@/data/two-factor-token"
//estamos criando um token com uuid
//expires server para definir o tempo de espera do token
//aonde vai ser depois de 1 hora de acordo com o tempo atual


export const generateTwoFactorToken = async(email : string )=>{
   const token = crypto.randomInt(100_000, 1_000_000).toString()
   const expires = new Date(new Date().getTime() + 5 * 60 * 1000)
   const existingToken = await getTokenFactorByEmail(email)
   if(existingToken){
    await db.twoFactorToken.delete({
        where : {id : existingToken.id}
    })
   }
   const createTwoFactorToken = await db.twoFactorToken.create({
    data : {
        email,
        expires,
        token
    }
   })
   return createTwoFactorToken
}


export const generateVerificationTokenResetPassword = async(email:string)=>{

    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 3600 * 1000)

    // const existingToken = await getPasswordResetTokenByEmail(email)

    // if(existingToken){
    //     await db.verifyToken.delete({
    //         where : {id : existingToken.id}
    //     })
    // }

    const createTokenVericiationResetPassword = await db.passWordResetToken.create({
        data : {
            email,
            expires,
            token
        }
    })

    return createTokenVericiationResetPassword

}


export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken){
        await db.verifyToken.delete({
            where : {id : existingToken.id}
        })
    }

    const verificationToken = await db.verifyToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    return verificationToken




}