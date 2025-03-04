import { publicCardSchema, publicContactFormSchema, publicFilterBedroomsSchema, publicFilterPricesSchema, publicPropertyByIdSchema } from "@/src/schema/publicPropertySchema";
import { z } from "zod";

export type PublicCard = z.infer<typeof publicCardSchema>

export type PublicPropertyById = z.infer<typeof publicPropertyByIdSchema>

export type PublicContactForm = z.infer<typeof publicContactFormSchema>

export type FilterPrices = z.infer<typeof publicFilterPricesSchema>
export type FilterBedrooms = z.infer<typeof publicFilterBedroomsSchema>