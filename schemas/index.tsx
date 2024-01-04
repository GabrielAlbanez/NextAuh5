import * as z from "zod"

export const LoginShema = z.object({
    email : z.string().email({message : "E-mail invalido"}),
    password : z.string().min(1,{message : "a senha deve conter pelo menos um carcter"})
})

export const RegisterShema = z.object({
    email : z.string().email({message : "E-mail invalido"}),
    password : z.string().min(6,{message : "o minimo de caracteres deve ser de 6 digitos"}),
    name : z.string().min(1,{message : "nome é obrigatório"})
})