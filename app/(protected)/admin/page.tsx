

"use client"
import { admin } from "@/actions/admin"
import RoleGate from "@/components/auth/role-gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { currentRole } from "@/data/auth"
import { UserCurrenRole } from "@/hooks/user-current-role"
import { UserRole } from "@prisma/client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminPage = () => {

    const role = UserCurrenRole()

    const onApiRouteClik = () => {
        fetch("/api/admin").then((response : any) => {
            if (response.ok) {
                toast.success("rotas de api funcioanando", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.log("FORBIDDEN")
            }
        })
    }

    const onClickActionAdmin = ()=>{
        admin().then((data)=>{
            if(data.error){
                toast.error(data.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            if(data.success){
                toast.success(data.success, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }

    return (
        <Card className="w-[600px] ">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Admin
                </p>
            </CardHeader>
            <RoleGate allowedRole={UserRole.ADMIN}>
            <CardContent className="space-y-4">
             
        
                <div className="flex flex-row items-center justify-around rounded-lg border p-3 shadow-xl">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onClickActionAdmin}>
                        Clik para testar
                    </Button>
                </div>

                <div className="flex flex-row items-center justify-around rounded-lg border p-3 shadow-xl">
                    <p className="text-sm font-medium">
                        Admin-only Api Route
                    </p>
                    <Button onClick={onApiRouteClik}>
                        Clik para testar
                    </Button>
                </div>
            </CardContent>
            </RoleGate>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Card>
    )
}

export default AdminPage