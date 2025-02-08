import z from 'zod'

export const authCreateAccountSchema = z.object({
    name: z.string()
        .min(1, "El nombre es obligatorio").default(""),
    lastname: z.string()
        .min(1, "El apellido es obligatorio").default(""),
    email: z.string()
        .email("Debe ser un correo válido").default(""),
    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres").default(""),
    repeatPassword: z.string()
        .min(6, "La confirmación de contraseña es obligatoria").default(""),
}).refine(data => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
});

export const authCreateAccountGoogleSchema = z.object({
    name: z.string()
        .min(1, "El nombre es obligatorio").default(""),
    lastname: z.string()
        .min(1, "El apellido es obligatorio").default(""),
    email: z.string()
        .email("Debe ser un correo válido").default(""),
    authProvider: z.enum(["manual", "google"], {
        errorMap: () => ({ message: "El proveedor de autenticación debe ser 'manual' o 'google'." })
    }).default("manual"),
    confirmed: z.boolean()
        .default(false)
        .refine(val => val === true, {
            message: "El usuario debe estar confirmado para continuar."
    }),
});

export const authForgotPasswordSchema = z.object({
    email: z.string()
        .email("Debe enviar un correo válido").default(""),
})

export const authConfirmAccountSchema = z.object({
    token: z.string()
        .min(6, "El token debe tener exactamente 6 caracteres")
        .max(6, "El token debe tener exactamente 6 caracteres")
        .default("")
});

export const authRequestTokenSchema = z.object({
    email: z.string()
        .email("Debe enviar un correo válido").default(""),
})

export const authTokenSchema = z.object({
    token: z.string()
        .min(6, "El token debe tener exactamente 6 caracteres")
        .max(6, "El token debe tener exactamente 6 caracteres")
        .default("")
})

export const authUpdatePasswordSchema = z.object({
    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres").default(""),
    repeatPassword: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres").default(""),
}).refine(data => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
})

export const authLoginSchema = z.object({
    email: z.string()
        .email("Debe enviar un correo válido").default(""),
    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres").default(""),
})