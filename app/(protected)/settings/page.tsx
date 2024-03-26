"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { settins } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import React, { useState } from 'react'
import { useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { SettingsShema } from "@/schemas"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userCurrentUser } from "@/hooks/user-current-user"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import {
    Switch
} from "@/components/ui/switch"
import { UserRole } from "@prisma/client"
import { CldUploadWidget, CldUploadButton, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary"
import ImguploadSettings from "../_components/ImguploadSettings"
import { FaEdit } from "react-icons/fa";
import { updateImg } from "@/actions/updateimg"

type valuesDataImg = {
    imgUser: string
}


const Settings = () => {

    const user = userCurrentUser()

    const { update } = useSession()

    //o useTransition e bom para usar em funções de envios de formulario
    //pq assim que a startTransiton inicia os ispending muda para true
    //ai vc pode bloquear o usario de mecher no form
    const [isPending, startTransition] = useTransition()

    const [imgUser, setImgUser] = useState<string>("")

    const form = useForm<z.infer<typeof SettingsShema>>({
        resolver: zodResolver(SettingsShema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            Newpassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnable: user?.isTwoFactorEnabled || undefined
        }
    })



    const onSubmit = (values: z.infer<typeof SettingsShema>) => {
        startTransition(() => {
            settins(values).then((data) => {
                if (data?.error) {
                    toast.error(data?.error, {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                if (data?.success) {
                    toast.success("dados atualizados", {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }).catch(() => {
                toast.error("algo deu errado", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            update()
        })
    }

    const uploadImg = (values: valuesDataImg) => {

        startTransition(() => {
            updateImg(values).then((data) => {
                if (data?.sucess) {
                    toast.success("imagen trocada com sucesso", {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
            update()
        })

    }



    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    Settings
                </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 ">
                {user?.isOAuth ? (<></>) : (<> <div className="flex flex-col gap-4 items-center justify-center">
                    <ImguploadSettings imageUser={imgUser}>
                        <CldUploadWidget
                            onSuccess={(results: any) => {
                                setImgUser(results.info.url)
                            }}
                            signatureEndpoint={"/api/sign-image"}
                        >
                            {({ open }) => {
                                return (
                                    <button className=" flex items-center justify-center w-[100px] py-2 px-2 bg-transparent rounded-md text-white shadow-md" onClick={() => open()}>
                                        <FaEdit />
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </ImguploadSettings>

                    <Button disabled={isPending} onClick={() => { uploadImg({ imgUser }) }}>
                        Upload img
                    </Button>



                </div></>)}
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="space-y-4">
                            <FormField control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Gabriel" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )

                                }
                            />
                            {user?.isOAuth === false && (
                                <>
                                    <FormField control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="jon@example.com" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )

                                        }
                                    />

                                    <FormField control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="******" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )

                                        }
                                    />

                                    <FormField control={form.control}
                                        name="Newpassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>newPassword</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="******" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )

                                        }
                                    />
                                </>
                            )}



                            <FormField control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="select role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    User
                                                </SelectItem>
                                            </SelectContent>

                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )

                                }
                            />
                            {user.isOAuth === false && (
                                <>
                                    <FormField control={form.control}
                                        name="isTwoFactorEnable"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Two Factor</FormLabel>
                                                    <FormDescription>
                                                        Ativa  verificação de duas etapas para sua conta
                                                    </FormDescription>
                                                    <FormControl>
                                                        <Switch
                                                            disabled={isPending}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </FormItem>
                                        )

                                        }
                                    />
                                </>
                            )}

                        </div>
                        <Button disabled={isPending} type="submit" >Atualizar Dados</Button>
                    </form>
                </Form>
            </CardContent>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </Card>
    )
}

export default Settings