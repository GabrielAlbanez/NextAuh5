"use server"
import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { db } from "@/lib/db"
import { sendVerificationEmailResetPassword } from "@/lib/mail"
import { generateVerificationTokenResetPassword } from "@/lib/tokens"

export const reset = async (values: z.infer<typeof ResetSchema>)=>{
    const vlidateFilds = ResetSchema.safeParse(values)

     if(!vlidateFilds.success){
        return {error : "email invalido"}
     }

     const {email} = vlidateFilds.data


     const existingUser = await db.user.findUnique({where : {email}})

     console.log(existingUser)

     if(!existingUser){
        return {error : "email nao existente"}
     }

     const passwordToken = await generateVerificationTokenResetPassword(email)
     if(!passwordToken) return;
     await sendVerificationEmailResetPassword(passwordToken.email,passwordToken.token)

     return {success : "email enviado"}





}
