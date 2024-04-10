"use server"

import { currentUser } from "@/components/auth/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

type valuesData = {
    takeImg: Array<string> | undefined
}

export const UpdateImgYourGallery = async (values: valuesData) => {


    console.log(values.takeImg)

    const user = await currentUser()

    if (!user) {
        return { error: "Usuário não encontrado" }
    }

    const existingUser = await getUserById(user.id)

    if (!existingUser) {
        return { error: "Usuário não encontrado" }
    }

    // Verifica se o usuário já possui uma galeria
    const existingGallery = await db.galerryUser.findFirst({
        where: {
            User: {
                email: existingUser.email
            }
        }
    })

    if (existingGallery) {

        let updatedPictures: string[] = []
        if (existingGallery.pictures) {
            updatedPictures = existingGallery.pictures.concat(values.takeImg || [])
        } else {
            updatedPictures = values.takeImg || []
        }

        await db.galerryUser.update({
            where: {
                id: existingGallery.id
            },
            data: {
                pictures: updatedPictures
            }
        })
    } else {
        await db.galerryUser.create({
            data: {
                pictures: values.takeImg,
                emailUser: existingUser.email
            }
        })
    }

    revalidateTag("settings")

    return { success: "upload realizado com sucesso" }
}
