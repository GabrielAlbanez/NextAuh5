/**
 * rotas que vao ser publicas
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
]


/**
 * rotaa de autenticação
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"

   
]

/**
 * prefixo de rota da api do atuh para sempre ser publica
 * 
 */

export const apiAuthPrefix = "/api/auth"

/**
 * rota que o usuario vai ser redirecioanado caso ele estiver logado
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings"