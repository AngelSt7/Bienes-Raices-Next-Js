import { userSchema, userUpdateEmailSchema, userUpdatePasswordSchema, userUpdatePhoneSchema } from "@/src/schema/userSchema";
import { z } from "zod";

export type User = z.infer<typeof userSchema>
export type UserUpdatePhone = z.infer<typeof userUpdatePhoneSchema>
export type UserUpdatePassword = z.infer<typeof userUpdatePasswordSchema>
export type UserUpdateEmail = z.infer<typeof userUpdateEmailSchema>
