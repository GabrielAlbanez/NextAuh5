"use server"
import bcypt from "bcryptjs"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { generateVerificationTokenResetPassword } from "@/lib/tokens"
import { ResetSchemaPassword } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"

export const newPassword = async (values: z.infer<typeof ResetSchemaPassword>, token: string | null) => {
    if (!token) {
        return { error: "token nao encontrado" }
    }

    const validateFilds = ResetSchemaPassword.safeParse(values)

    if (!validateFilds.success) {
        return { error: "senha invalida" }
    }

    const { password } = validateFilds.data
    
    const existingToken =  await getPasswordResetTokenByToken(token)
    if (!existingToken) {
        return { error: "token invalido" }
    }

    //cosntante que va definir o tempo para ver se o token ja foi expirado

    const hasExpired = new Date(existingToken.expires) < new Date()
 
     if(hasExpired){
        return {error : "token expirado, por favor refazer todo procedimento"}
     }

     const existingUSer = await getUserByEmail(existingToken.email)
      
     if(!existingUSer){
        return {error : "esse email que vc quer trocar a senha nao existe"}
     }

     const hashePassword = await bcypt.hash(password,10) 


     await db.user.update({
        where : {
            id : existingUSer.id
        },
        data : {password : hashePassword}
     })

   

     await db.passWordResetToken.delete({
        where : {id : existingToken.id}
     })

     return {success : "senha trocada com sucesso"}

    }


