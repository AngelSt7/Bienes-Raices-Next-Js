import { z } from "zod";
import { adminFormDataPropertySchema, adminGetDetailsPropertyInModalSchema, adminGetGameByIdSchema, adminGetPropertySchema } from "@/src/schema/adminPropertySchema";

export type AdminFormDataProperty = z.infer<typeof adminFormDataPropertySchema>
export type AdminProperty = z.infer<typeof adminGetPropertySchema>
export type AdminModalProperty = z.infer<typeof adminGetDetailsPropertyInModalSchema>
export type AdminPropertyById = z.infer<typeof adminGetGameByIdSchema>

export type PaginationType = { page: number, take: number }

export type SessionNextAuth = { email: string }