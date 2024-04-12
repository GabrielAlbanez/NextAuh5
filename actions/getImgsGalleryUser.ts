"use server"

import { currentUser } from "@/components/auth/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"



export const getGalleryImgUser = async () => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuário não encontrado" }
    }

    const existingUser = await getUserById(user.id)

    if (!existingUser) {
        return { error: "Usuário não encontrado" }
    }

    const data = await db.user.findMany({
        where : {
            email : user.email
        },
        select : {
            YourGalerry : {
                select : {
                    pictures : true
                }
            }
        }
    })

    return data

}