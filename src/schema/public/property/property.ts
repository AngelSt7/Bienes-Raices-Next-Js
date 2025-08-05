import z from 'zod'

export const cardSchema = z.object({
  id: z.number().positive().min(1),
  district: z.object({ district: z.string() }),
  area: z.number(),
  location: z.string(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  imageMain: z.string(),
  type: z.object({ type: z.string() }),
  price: z.number(),
  currency: z.object({ currency: z.string() }),
  publishedAt: z.preprocess((val) => new Date(val as string), z.date()),
})

export const publicFilterPricesSchema = z.object({
  minPrice: z.number(),
  maxPrice: z.number()
})

export const publicFilterBedroomsSchema = z.object({
  minBedroom: z.number(),
  maxBedroom: z.number()
})


export const findPropertySchema = z.object({
  id: z.number(),
  location: z.string(),
  description: z.string(),
  imageMain: z.string().url(),
  area: z.number(),
  price: z.number(),
  terrace: z.boolean(),
  elevator: z.boolean(),
  furnished: z.boolean(),
  parkingSpaces: z.boolean(),
  bedrooms: z.number(),
  latitude: z
    .number()
    .min(-90, "La latitud debe estar entre -90 y 90")
    .max(90, "La latitud debe estar entre -90 y 90"),
  longitude: z
    .number()
    .min(-180, "La longitud debe estar entre -180 y 180")
    .max(180, "La longitud debe estar entre -180 y 180"),
  bathrooms: z.number(),
  yearBuilt: z.number(),
  publishedAt: z.preprocess((val) => new Date(val as string), z.date()),
  availability: z.boolean(),
  user: z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    phone: z.number(),
  }),
  district: z.object({
    district: z.string(),
  }),
  currency: z.object({
    currency: z.string(),
  }),
  type: z.object({
    type: z.string(),
  }),
  departament: z.object({
    departament: z.string(),
  }),
  imagesToProperty: z.array(z.string().url()),
  serviceToProperty: z.array(z.string()),
})

export const cardsSchema = z.array(cardSchema)

export const publicContactFormSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string(),
  message: z.string(),
  direction: z.string()
})

export const publicCardsSearchSchema = z.object({
  properties: cardsSchema,
  pages: z.number().positive().min(1)
})