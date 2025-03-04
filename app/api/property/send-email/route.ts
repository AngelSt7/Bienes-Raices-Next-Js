import { AuthEmail } from "@/src/class/AuthEmail";
import { publicContactFormSchema } from "@/src/schema/publicPropertySchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const validation = validateData(publicContactFormSchema, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })
        await AuthEmail.sendPropertyInquiryEmail(validation.data)
        return NextResponse.json({message: 'Contacto realizado con exito, el propietario de comunicará la brevedad'})
    } catch (error) {
         return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
}