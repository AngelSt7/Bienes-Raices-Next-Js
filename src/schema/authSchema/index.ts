import z from 'zod'
const phoneMin = 900000000
const phoneMax = 999999999

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
    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD")
        .refine((date) => {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        }, "La fecha ingresada no es válida")
        .refine((date) => {
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();
            const isUnder18 = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
            return !isUnder18;
        }, "Debes tener al menos 18 años"),
    phone: z
        .string()
        .regex(/^\d{9}$/, "El número de teléfono debe tener exactamente 9 dígitos"),
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
    authProvider: z.enum(["google"], {
        errorMap: () => ({ message: "El proveedor de autenticación debe ser google." })
    }),
    confirmed: z.boolean(),
    birthDate: z.preprocess((val) => new Date(val as string), z.date()),
    password: z.null(),
    phone: z.number().int().min(phoneMin).max(phoneMax).nullable(),
    createdAt: z.preprocess((val) => new Date(val as string), z.date()),
});

export const authCompleteAccountSchema = z.object({
    name: z.string()
        .min(1, "El nombre es obligatorio").default(""),
    lastname: z.string()
        .min(1, "El apellido es obligatorio").default(""),
    phone: z.string()
        .regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos numéricos")
        .nullable(),
    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD")
        .refine((date) => {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        }, "La fecha ingresada no es válida")
        .refine((date) => {
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();
            const isUnder18 = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
            return !isUnder18;
        }, "Debes tener al menos 18 años"),
})

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