"use server"

import { currentUser } from "@/components/auth/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"


type valuesData = {
    imgUser : string | undefined
}
 
export const updateImg = async(values : valuesData )=>{

    const user = await currentUser()

    if (!user) {
        return { error: "usuario não encontrado" }
    }

    const existingUser = await getUserById(user.id)

    if (!existingUser) {
        return { error: "usuario não encontrado" }
    }

    if (user.isOAuth) {
        values.imgUser = undefined

    }

    await db.user.update({
        where : {
            id : user.id
        },
        data : {image : values.imgUser}
    })
    
    return {sucess : "imagem atualizada"}

       

}





