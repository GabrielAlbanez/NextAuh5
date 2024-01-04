import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req

    const isLogedInn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

    /**
     * esse isPublic route ele vai fazer una verficação pegando a rota atual que o usuario ta e verificando se tem esse valor no array com as rotas que foram definidas
     */
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthROutes = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return null
    }

    if (isAuthROutes) {
        if (isLogedInn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return null
    }

    if(!isLogedInn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login",nextUrl))
    }

    return null


})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

//esse macher define em qual rota deve se chmar o middleware para fazer a verficação
//essa expresao com um monte de coisa server para invoca o middleware em todas as rotas
//pegamos o macher do clerk js pois e melhor do que o do auth padrao