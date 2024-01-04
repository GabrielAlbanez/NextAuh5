/**
 * rotas que vao ser publicas
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/new-password"
]


/**
 * rotaa de autenticação
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset"

   
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