import { z } from "zod";

export const adminCreateProperty = z.object({
  districtId: z
    .number({ required_error: "El ID del distrito es obligatorio." })
    .int("El ID del distrito debe ser un número entero.")
    .positive("El ID del distrito debe ser un número positivo."),
  area: z
    .number({ required_error: "El área es obligatoria." })
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
  currency: z.enum(["USD", "PEN"], {
    errorMap: () => ({ message: "La moneda debe ser 'USD' o 'PEN'." }),
  }),
  elevator: z.boolean({ required_error: "El campo ascensor es obligatorio." }),
  parkingSpaces: z
    .number({ required_error: "El número de estacionamientos es obligatorio." })
    .int("El número de estacionamientos debe ser un entero.")
    .nonnegative("El número de estacionamientos no puede ser negativo."),
  furnished: z.boolean({ required_error: "El campo amoblado es obligatorio." }),
  services: z
    .array(z.string().min(1, "Cada servicio debe tener al menos 1 carácter."))
    .nonempty("Debe proporcionar al menos un servicio."),
  images: z
    .array(z.string().url("Cada imagen debe ser una URL válida."))
    .nonempty("Debe proporcionar al menos una imagen."),
  security24h: z.boolean({ required_error: "El campo seguridad 24h es obligatorio." }),
});


export const adminEditProperty = adminCreateProperty.extend({
  availability: z.boolean({ required_error: "El campo disponibilidad es requerido" })
})