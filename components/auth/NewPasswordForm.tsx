"use client"
import React, { useState } from 'react'
import { CardWrapper } from './Card-Wrapper'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import {ResetSchemaPassword } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSucess } from '../form-sucess'
import { login } from '@/actions/login'
import { useTransition } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reset } from '@/actions/reset'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'

export const NewPasswordForm = () => {

    const serachParams = useSearchParams()

    const token = serachParams.get('token')

    const [error, setError] = useState<string | undefined>("")
    const [sucess, setSucess] = useState<string | undefined>("")


    const [isPeding, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchemaPassword>>({
        resolver: zodResolver(ResetSchemaPassword),
        defaultValues: {
            password: "",
        }
    })

    const onSumit = (values: z.infer<typeof ResetSchemaPassword>) => {
        setError("")
        setSucess("")
        startTransition(() => {
            newPassword(values,token).then((data) => {
                setError(data?.error)
                setSucess(data?.success)
                if(data?.error){
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
                if(data?.success){
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

        })

    }

    return (
        <CardWrapper
            headerLabel='Escreva sua nova Senha'
            backButtonLabel='voltar para pagina de login'
            backButtonHref='/auth/login'

        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSumit)}>
                    <div className='space-y-4'>
                        <FormField control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={isPeding}
                                            placeholder='****'
                                            type='password'
                                            

                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                  
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
                    <Button disabled={isPeding} type='submit' className='w-full'>
                        Resetar Senha
                    </Button>
                </form>
            </Form>

        </CardWrapper>
    )
}

