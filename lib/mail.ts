import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)


export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "confirmação de email",
        html: `<p>Clik <a href="${confirmLink}">aqui</a>para confirmar seu email</p>`
    })
}

export const sendVerificationEmailResetPassword = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Resetar Senha",
        html: `<p>Clik <a href="${resetLink}">aqui</a>para resetar sua senha</p>`
    })
}