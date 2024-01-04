"use server"
import * as z from "zod"
import { signIn } from "@/auth"
import { LoginShema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
export const login = async (values: z.infer<typeof LoginShema>) => {

    const validateFields = LoginShema.safeParse(values)

    if (!validateFields.success) {
        return { error: "ivalid fields" };

    }

    const { email, password } = validateFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "credenciais invalidas" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: "Confirmar verifição de email" }
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

