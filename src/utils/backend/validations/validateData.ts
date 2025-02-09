import { ZodSchema } from "zod";

export const validateData = (schema: ZodSchema, data: unknown) => {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errorMessages = Object.values(result.error)
        return { success: false, errors: errorMessages };
    }
    return { success: true, data: result.data };
};
