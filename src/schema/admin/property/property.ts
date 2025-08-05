import { z } from "zod";

export const formDataPropertySchema = z.object({
  id: z.number().optional(),
  districtId: z
    .number({ required_error: "El ID del distrito es obligatorio." })
    .int("El ID del distrito debe ser un número entero.")
    .positive("El ID del distrito debe ser un número positivo."),
  area: z
    .number({ required_error: "El área es obligatoria." })
    .min(20, "El area minima es de 20 metros")
    .positive("El área debe ser un número positivo."),
  location: z
    .string({ required_error: "La ubicación es obligatoria." })
    .min(5, "La ubicación debe tener al menos 5 caracteres.")
    .max(255, "La ubicación no puede superar los 255 caracteres."),
  bedrooms: z
    .number({ required_error: "El número de habitaciones es obligatorio." })
    .int("El número de habitaciones debe ser un entero.")
    .nonnegative("El número de habitaciones no puede ser negativo."),
  bathrooms: z
    .number({ required_error: "El número de baños es obligatorio." })
    .int("El número de baños debe ser un entero.")
    .nonnegative("El número de baños no puede ser negativo."),
  terrace: z.boolean({ required_error: "El campo terraza es obligatorio." }),
  yearBuilt: z
    .number({ required_error: "El año de construcción es obligatorio." })
    .int("El año de construcción debe ser un número entero.")
    .min(1900, "El año de construcción no puede ser menor a 1900.")
    .max(new Date().getFullYear(), "El año de construcción no puede ser en el futuro."),
  typeId: z
    .number({ required_error: "El ID del tipo de propiedad es obligatorio." })
    .int("El ID del tipo de propiedad debe ser un número entero.")
    .positive("El ID del tipo de propiedad debe ser un número positivo."),
  description: z
    .string({ required_error: "La descripción es obligatoria." })
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(1000, "La descripción no puede superar los 1000 caracteres."),
  price: z
    .number({ required_error: "El precio es obligatorio." })
    .positive("El precio debe ser un número positivo."),
  currencyId: z.number({ required_error: "El id de la moneda es requerido" })
    .positive("El id no puede ser un número negativo")
    .min(1, "El id no puede ser inferior a 0"),
  elevator: z.boolean({ required_error: "El campo ascensor es obligatorio." }),
  parkingSpaces: z.boolean({ required_error: "El campo gas natural es obligatorio" }),
  furnished: z.boolean({ required_error: "El campo amoblado es obligatorio." }),
  services: z
    .array(z.string().min(1, "Cada servicio debe tener al menos 1 carácter.")).default(['']),
  imageMain: z.union([
    z.instanceof(File).refine((file) => file.size > 0, { message: "El archivo debe tener contenido válido" }),
    z.string().url("Debe ser una URL válida"),
  ]),
  imagesGallery: z.array(
    z.union([
      z.instanceof(File).refine((file) => file.size > 0, {
        message: "El archivo debe tener contenido válido"
      }),
      z.string().url("Debe ser una URL válida"),
    ])
  )
});

export const propertySchema = z.object({
  id: z.number(),
  imageMain: z.string(),
  location: z.string(),
  price: z.number(),
  type: z.object({ type: z.string() }),
  availability: z.boolean(),
  publishedAt: z.string(),
  currency: z.object({ currency: z.string() })
})

export const detailsPropertySchema = z.object({
  id: z.number(),
  location: z.string(),
  price: z.number(),
  imageMain: z.string(),
  availability: z.boolean(),
  type: z.object({ type: z.string() }),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  yearBuilt: z.number(),
  publishedAt: z.string(),
  district: z.object({ district: z.string() }),
  departament: z.object({ departament: z.string() }),
  currency: z.object({ currency: z.string() }),
  serviceToProperty: z.array(z.object({ service: z.string() }))
})

export const findPropertySchema = z.object({
  id: z.number().int().positive(),
  location: z.string().min(5).max(255),
  description: z.string().min(15).max(500),
  imageMain: z.string().url(),
  area: z.number().int().positive(),
  price: z.number().int().positive(),
  terrace: z.boolean(),
  elevator: z.boolean(),
  furnished: z.boolean(),
  parkingSpaces: z.boolean(),
  currencyId: z.number().int().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  yearBuilt: z.number().int().min(1900).max(new Date().getFullYear()),
  districtId: z.number().int().positive(),
  typeId: z.number().int().positive(),
  userId: z.number().int().positive(),
  departmentId: z.number().int().positive(),
  publishedAt: z.string(),
  availability: z.boolean(),
  services: z.array(z.string()),
  imagesGallery: z.array(z.string())
})


export const listPropertiesSchema = z.object({
  properties: z.array(propertySchema),
  pages: z.number()
})