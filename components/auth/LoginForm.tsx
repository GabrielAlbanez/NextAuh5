"use client"
import React, { useState } from 'react'
import { CardWrapper } from './Card-Wrapper'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { LoginShema } from '@/schemas'
import { useSearchParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSucess } from '../form-sucess'
import { login } from '@/actions/login'
import { useTransition } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

export const LoginForm = () => {
    const serchParams = useSearchParams()
    const urlError = serchParams.get("error") === "OAuthAccountNotLinked" ? "esse email ja esta sendo usado em outro provider" : ""
    const [showToFactor,setShowToFactor] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [sucess, setSucess] = useState<string | undefined>("")


    const [isPeding, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginShema>>({
        resolver: zodResolver(LoginShema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSumit = (values: z.infer<typeof LoginShema>) => {
        setError("")
        setSucess("")
        startTransition(() => {
            login(values).then((data) => {
                
                
                
                if(data?.error){
                    setError(data?.error)
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
                if(data?.success){
                    setSucess(data?.success)
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

                if(data?.twoFactor){
                    setShowToFactor(true)
                }
            })
            .catch(()=>{
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

        })

    }

    console.log(onSumit)

    return (
        <CardWrapper
            headerLabel='Bem vindo de Volta'
            backButtonLabel='Não tem uma conta?'
            backButtonHref='/auth/register'
            showSocial

        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSumit)}>
                    <div className='space-y-4'>
                     {!showToFactor ? (<>
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
                                    <Button variant="link" size="sm" className='px-0 font-normal'><Link href='/auth/reset'>Esqueci Senha</Link></Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /></>) : (<>
                            <FormField control={form.control}
                            name='code'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={isPeding}
                                            placeholder='123456'
                                            type='text'
                                            />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                      
                        </>)}

                    </div>
                    <FormError message={urlError} />
                    {/* <FormSucess message={sucess} /> */}
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
                        {showToFactor ? "confirmar" : "Login"}
                    </Button>
                </form>
            </Form>

        </CardWrapper>
    )
}

