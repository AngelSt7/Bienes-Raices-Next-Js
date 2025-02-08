import { prisma } from "@/src/config/prisma";
import { UserExistNoAuth } from "@/src/utils/backend/validations/UserExistNoAuth";
import { dataSendEmail } from "@/src/utils/backend/emailUtils";
import { NextRequest, NextResponse } from "next/server";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { authForgotPasswordSchema } from "@/src/schema/authSchema";

export const POST = async (request: NextRequest) => {
    try {
        const body  = await request.json().catch(()=>({}))

        const validation = validateData(authForgotPasswordSchema, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 }); 
    
        const { email } = validation.data
        const userExist = await UserExistNoAuth(email)
        if (userExist instanceof NextResponse) return userExist

        if (!userExist.confirmed) {
            const error = new Error('El usuario no está confirmado');
            return NextResponse.json({ error: error.message }, { status: 409 })
        }

        const tokenExist = await prisma.token.findFirst({ where: { userId: userExist.id } });
        await dataSendEmail(userExist, tokenExist!, false)
        return NextResponse.json({ message: 'Hemos enviado instrucciones para restablecer tu contraseña a tu email' })
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}