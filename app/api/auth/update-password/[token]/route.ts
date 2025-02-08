import { prisma } from "@/src/config/prisma"
import { authTokenSchema, authUpdatePasswordSchema } from "@/src/schema/authSchema";
import { hashPassword } from "@/src/utils/backend/authUtils";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server"

type Params = {
    token: string;
};

export const POST = async (request: NextRequest, { params }: { params: Params }) => {
    try {
        const body = await request.json().catch(()=>({}))
        const { token } = await params;

        const validationBody = validateData(authUpdatePasswordSchema, {password: body.password, repeatPassword: body.password});
        const validationParam = validateData(authTokenSchema, { token });
        
        if (!validationBody.success || !validationParam.success) {
            return NextResponse.json({ 
                errors: validationBody.errors || validationParam.errors 
            }, { status: 400 });
        }
        
        const tokenExist = await prisma.token.findFirst({ where: { token: parseInt(validationParam.data.token) } })

        if (!tokenExist) {
            const error = new Error("Token no válido");
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        const currentTime = new Date();
        const tokenExpirationTime = new Date(tokenExist.expiresAt)

        if (currentTime > tokenExpirationTime) {
            await prisma.token.delete({ where: { id: tokenExist.id } })
            const error = new Error('El token ha expirado, solicite uno nuevo')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        const userExist = await prisma.user.findUnique({ where: { id: tokenExist.userId } })
        
        if (!userExist) {
            const error = new Error('Usuario no encontrado')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        
        const passwordHash = await hashPassword(validationBody.data.password)
        
        await prisma.user.update({
            where: { id: userExist.id },
            data: { password: passwordHash }
        })
        
        await prisma.token.delete({ where: { id: tokenExist.id } });
        return NextResponse.json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}