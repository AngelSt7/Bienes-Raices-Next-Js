import { z } from "zod";
import { authCreateAccountSchema, authForgotPasswordSchema, authLoginSchema, authRequestTokenSchema, authTokenSchema, authUpdatePasswordSchema } from "@/src/schema/authSchema"

export type AuthCreateAccount = z.infer<typeof authCreateAccountSchema>
export type AuthForgotPassword = z.infer<typeof authForgotPasswordSchema>
export type AuthRequestToken= z.infer<typeof authRequestTokenSchema>
export type AuthToken= z.infer<typeof authTokenSchema>
export type AuthUpdatePassword= z.infer<typeof authUpdatePasswordSchema>
export type AuthLogin= z.infer<typeof authLoginSchema>