"use server"
import * as z from "zod"
import { RegisterShema } from "@/schemas"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
export const Register = async (values: z.infer<typeof RegisterShema>) => {

    const validateFields = RegisterShema.safeParse(values)

    if (!validateFields.success) {
        return { error: "ivalid fields" };

    }

    const { name, email, password } = validateFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "ese email ja esta sendo utilizado" }
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Confirmar email!" }
}

