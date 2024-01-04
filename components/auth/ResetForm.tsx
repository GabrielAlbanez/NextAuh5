"use client"
import React, { useState } from 'react'
import { CardWrapper } from './Card-Wrapper'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import {ResetSchema } from '@/schemas'
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

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [sucess, setSucess] = useState<string | undefined>("")


    const [isPeding, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSumit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSucess("")
        startTransition(() => {
            reset(values).then((data) => {
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
            headerLabel='Esqueci Senha'
            backButtonLabel='voltar para pagina de login'
            backButtonHref='/auth/login'

        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSumit)}>
                    <div className='space-y-4'>
                        <FormField control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={isPeding}
                                            placeholder='gabriel.do@example.com'
                                            type='email' />
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
                        enviar email para redefinição de senha
                    </Button>
                </form>
            </Form>

        </CardWrapper>
    )
}

