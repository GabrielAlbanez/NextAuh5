import { db } from "@/lib/db";


export const getUserByEmail = async (email: string) => {

    try {

        const dataUser = await db.user.findUnique({
            where: {
                email: email
            }
        })

        return dataUser

    } catch (error) {
        return null
    }


}


export const getUserById = async (id: string) => {

    try {

        const dataUser = await db.user.findUnique({
            where: {
                id: id
            }
        })

        return dataUser

    } catch (error) {
        return null
    }


}