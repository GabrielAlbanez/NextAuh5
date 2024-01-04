"use server"
import * as z from "zod"
import { signIn } from "@/auth"
import { LoginShema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail, sendTwoFactorVerificationEmial } from "@/lib/mail"
import { generateTwoFactorToken } from "@/lib/tokens"
import { getTokenFactorByEmail } from "@/data/two-factor-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/to-factor-confirmation"
export const login = async (values: z.infer<typeof LoginShema>) => {

    const validateFields = LoginShema.safeParse(values)

    if (!validateFields.success) {
        return { error: "ivalid fields" };

    }

    const { email, password, code } = validateFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "credenciais invalidas" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: "Confirmar verifição de email" }
    }

    if (existingUser.isTwoFactorEnable && existingUser.email) {
        if (code) {
           const twoFactorToken = await getTokenFactorByEmail(existingUser.email)

           if(!twoFactorToken){
             return {error : "invalid code"}
           }

           if(twoFactorToken.token !== code){
            return {error : "invalid code"}
           }

           const hasExpire = new Date(twoFactorToken.expires) < new Date()

            if(hasExpire){
                return {error : "codigo de verifcação de duas etapas expirado"}
            }

            await db.twoFactorToken.delete({
                where : {id : twoFactorToken.id}
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                
            if(existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where : {id : existingConfirmation.id}
                })
            }
            await db.twoFactorConfirmation.create({data : {userId : existingUser.id}})

        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorVerificationEmial(twoFactorToken.email, twoFactorToken.token)

        return { twoFactor: true }
           
        }
    }


    try {
        await signIn("credentials", {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Email ou senha invalidos" }
                default:
                    return { error: "algo de errado" }
            }
        }
        throw error
    }
}

