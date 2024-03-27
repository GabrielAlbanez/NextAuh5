"use client"
import React, { useState } from 'react'
import { CardWrapper } from './Card-Wrapper'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { RegisterShema } from '@/schemas'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSucess } from '../form-sucess'
import { useTransition } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Register } from '@/actions/register'

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [sucess, setSucess] = useState<string | undefined>("")


    const [isPeding, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterShema>>({
        resolver: zodResolver(RegisterShema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const onSumit = (values: z.infer<typeof RegisterShema>) => {
        setError("")
        setSucess("")
        startTransition(() => {
            Register(values).then((data) => {
                setError(data.error)
                setSucess(data.success)
                if (data.error) {
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
                if (data.success) {
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
            })

        })
    }

    return (
        <CardWrapper
            headerLabel='Criar Conta'
            backButtonLabel='vc ja tem uma conta??'
            backButtonHref='/auth/login'

        >
            {sucess ? (<> <FormSucess message={sucess} /></>) : (<>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(onSumit)}>
                        <div className='space-y-4'>

                            <FormField control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                disabled={isPeding}
                                                placeholder='gabriel'
                                                type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

                            <FormField control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                disabled={isPeding}
                                                placeholder='******'
                                                type='password' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <FormError message={error} />

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
                            Criar Conta!
                        </Button>
                    </form>
                </Form></>)}


        </CardWrapper>
    )
}

