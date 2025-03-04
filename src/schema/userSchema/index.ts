import { z } from "zod";

const phoneMin = 900000000
const phoneMax = 999999999

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().nullable(), 
    authProvider: z.enum(["google", "manual"]), 
    confirmed: z.boolean(),
    birthDate: z.preprocess((val) => new Date(val as string), z.date()), 
    phone: z.number().int().min(phoneMin).max(phoneMax).nullable(),
    createdAt: z.preprocess((val) => new Date(val as string), z.date()),
});


export const userUpdatePhoneSchema = z.object({
    phone: z.number().int().min(phoneMin).max(phoneMax)
})

export const userUpdateEmailSchema = z.object({
    email: z.string().email(),
})

export const userUpdatePasswordSchema = z.object({
    password: z.string().min(6), 
    currentPassword: z.string().min(6), 
    repeatPassword: z.string().min(6)
})