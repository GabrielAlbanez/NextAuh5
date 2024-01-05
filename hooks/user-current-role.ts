import { useSession } from "next-auth/react";



export const UserCurrenRole = ()=>{
    const session = useSession()

    return session.data?.user.role

    
}