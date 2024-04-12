import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getPicturesGalleruYuser, getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "./data/to-factor-confirmation"
import { getAccountByUserId } from "./data/account"
import { access } from "fs"



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({

  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  //esse event server para a gente ja poder verificar o campo emailVerifed no banco automatico quand ele usa um atuh de provedor extrno como google ou gihub ele indentifica isso pelo linkAccount
  //esse event de linkAccount ele sabe quando e feio um auth sem ser por credentials 
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  //essa calback de session serve para podermos exebir o id do usuario do banco na session
  //isso porque a session padrao nao vem o id ai temos que pegar o id do usuario que ta no token e passar para a session
  // ou seja aq ele esta estendo a session colocando o valor de session.user.id o valor do id do banco
  //esse session.user.id nao existia por isso caham de estender a session mesma coisa com o token de baixo para pegar a role

  //basicamente o que ta fazendo essa calback ela pega as informações do token que nao tem na session e estende para a session poder usar
  //aonde a ordem vai de token para session
  callbacks: {

    //esse calback de sigIn vai acontecer quando o usuario fizer login
    //se vc deixar o retun true ele vai passar direto la para credentilas do auth.config
    //mas caso vc quiser fazer aguma vlidação ou verificação faça aq e retone false para ele nao poder passar daq assim nunca vai chegar nas credentials


    //  async signIn({user}){

    //   const existingUser = await getUserById(user.id)

    //   if(!existingUser || !existingUser.emailVerified){
    //     return false
    //   }

    //      return true
    //  } , 

    async signIn({ user, account }) {
      //caso o provedor de auth nao for credentias tem que deixar passar direto
      //porque nao tem token gerado para outro tipo de auth
      if (account?.provider !== "credentials") return true

      //ta verificando se existe o usuario com o id passado
      const existingUser = await getUserById(user.id)

      //verifica se o email ja foi verificado caso nao for vai ter que mandar a verifcaçao
      if (!existingUser?.emailVerified) {
        return false
      }

      if (existingUser.isTwoFactorEnable) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if (!twoFactorConfirmation) {
          return false
        }

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }


      return true
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER"
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean

      }

      if (session.user) {
        session.user.image = token.image as string
      }

      if(session.user){
        session.user.gallery = token.galerryUserr as Array<string> | undefined
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }



      return session
    },
    async jwt({ token, user, trigger, session }) {

      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      const galerryUser = await getPicturesGalleruYuser(token.email)

      if (!existingUser) return token


      const existingAccount = await getAccountByUserId(existingUser.id)



      token.isOAuth = !!existingAccount





      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.image = existingUser.image;
      token.galerryUserr = galerryUser?.map((data)=>data.pictures)
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnable;

      if (trigger === "update" && session) {
        token = { ...token, user: session }
        return token;
      };

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})