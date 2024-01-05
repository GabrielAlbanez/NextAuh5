import { UserRole } from "@prisma/client"
import * as z from "zod"


export const SettingsShema = z.object({
    name : z.optional(z.string().min(2,{message : "pelo menos 2 caracteres"})),
    isTwoFactorEnable : z.optional(z.boolean()),
    role : z.enum([UserRole.ADMIN,UserRole.USER]),
    email : z.optional(z.string().email()),
    password : z.optional(z.string().min(6)),
    Newpassword : z.optional(z.string().min(6)),

})
.refine((data)=>{
    if(!data.Newpassword && !data.password){
        return false
    }
    return true
},{
    message : "new password is required",
    path : ["Newpassword"]
})

export const LoginShema = z.object({
    email : z.string().email({message : "E-mail invalido"}),
    password : z.string().min(1,{message : "a senha deve conter pelo menos um carcter"}),
    code : z.optional(z.string())
})

export const RegisterShema = z.object({
    email : z.string().email({message : "E-mail invalido"}),
    password : z.string().min(6,{message : "o minimo de caracteres deve ser de 6 digitos"}),
    name : z.string().min(1,{message : "nome é obrigatório"})
})

export const ResetSchema = z.object({
    email : z.string().email({message : 'email is required'})
})

export const ResetSchemaPassword = z.object({
    password : z.string().min(6,{message : 'sua nova senha tem que ter mais de 6 caracteres'})
})