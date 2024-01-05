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

const Settings = () => {

    const user = userCurrentUser()

    const { update } = useSession()

    //o useTransition e bom para usar em funções de envios de formulario
    //pq assim que a startTransiton inicia os ispending muda para true
    //ai vc pode bloquear o usario de mecher no form
    const [isPending, startTransition] = useTransition()

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
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                if (data?.success) {
                    toast.success(data?.success, {
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

    console.log(user?.isOAuth)

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    Settings
                </p>
            </CardHeader>
            <CardContent>
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
                        <Button disabled={isPending} type="submit" >Save Name</Button>
                    </form>
                </Form>
            </CardContent>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </Card>
    )
}

export default Settings