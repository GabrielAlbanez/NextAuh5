"use client"

import { UserCurrenRole } from "@/hooks/user-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";
interface roleGateProps {
    children : React.ReactNode;
    allowedRole : UserRole;
}

const RoleGate = ({children,allowedRole} : roleGateProps) => {
    const role = UserCurrenRole()

    if(role !== allowedRole){
        return (
            <FormError message="você nao tem permissão para ver esse conteudo"/>
        )
        
    }

    return (
        <div>
             {children}
        </div>
    );
}
 
export default RoleGate;