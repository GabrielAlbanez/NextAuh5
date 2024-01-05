"use server"


import * as z from "zod"

import { SettingsShema } from "@/schemas"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/components/auth/auth"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"

export const settins = async (
    values: z.infer<typeof SettingsShema>
) => {

    const user = await currentUser()

    if (!user) {
        return { error: "nao autorizado" }
    }

    const existingUser = await getUserById(user.id)

    if (!existingUser) {
        return { error: "nao autorizado" }
    }

    //para quando o auth seje de outra maneira sem ser por crendetials 
    //nao redefinir nada por isso igualamos tudo a undefined
    if (user.isOAuth) {
        values.email = undefined,
            values.password = undefined,
            values.Newpassword = undefined
        values.isTwoFactorEnable = undefined

    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)

        if(existingUser && existingUser.id !== user.id){
            return {error : "esse email ja esta sendo utilizado"}
        }

        const verificationToken = await generateVerificationToken(values.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return {success : "verificar email!"}

    }

    if(values.password && values.Newpassword && existingUser.password ){
           const passwordMacht = await bcrypt.compare(values.password,existingUser.password)

           if(!passwordMacht){
            return {error : "senha incorreta"}
           }

           const hashedPassword = await bcrypt.hash(values.Newpassword,10)

           values.password = hashedPassword
           values.Newpassword = undefined
    }

    await db.user.update({
        where: { id: user.id },
        data: { ...values }
    })


    return { success: "dados atulizados" }


}