import z from 'zod'

export const authCreateAccountSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    password: z.string(),
    repeatPassword: z.string(),
    number: z.number(),
    age: z.number(),
})

export const authForgotPasswordSchema = z.object({
    email: z.string(),
})

export const authRequestTokenSchema = z.object({
    email: z.string(),
})

export const authTokenSchema = z.object({
    token: z.string()
})

export const authUpdatePasswordSchema= z.object({
    password: z.string(),
    repeatPassword: z.string(),
})

export const authLoginSchema = z.object({
    email: z.string(),
    password: z.string(),
})