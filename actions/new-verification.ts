"use server"

import { db } from "@/lib/db"

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verificantion-token"

export const newVerification = async(token:string)=>{
  const existinToken = await getVerificationTokenByToken(token)

  if(!existinToken){
    return {error : "token invalido"}
  }

  const tokenExpirado = new Date(existinToken.expires) < new Date()

  //verifica se o token nao ta expirado

  if(tokenExpirado){
    return {error :  "token expirado"}
  }

  const existingUser = await getUserByEmail(existinToken.email)
  //verifca se o email passado pelo token ta relacionado com algum usario do banco

  if(!existingUser){
    return {error : "email nao existente"}
  }

  await db.user.update({
    where : {
        id : existingUser.id
    },
    data : {emailVerified : new Date(),email : existinToken.email}
  })

  // await db.verifyToken.delete({
  //   where : {id : existinToken.id}
  // })

  return {success : "email verificado com sucesso"}
}