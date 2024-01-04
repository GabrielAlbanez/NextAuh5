import { getVerificationTokenByEmail } from "@/data/verificantion-token"
import { v4 as uuidv4 } from "uuid"
import { db } from "./db"

//estamos criando um token com uuid
//expires server para definir o tempo de espera do token
//aonde vai ser depois de 1 hora de acordo com o tempo atual

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