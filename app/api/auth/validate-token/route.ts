import { prisma } from "@/src/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        const { token } = await request.json()

        const tokenExist = await prisma.token.findFirst({where: {token: parseInt(token)}})

        if (!tokenExist) {
            const error = new Error("Token no válido");
            return NextResponse.json({ error: error.message }, {status: 404});
        }
    
        if (new Date() > new Date(tokenExist.expiresAt)) {
            await prisma.token.delete({ where: { id: tokenExist.id } });
            const error = new Error('El token ha expirado, solicite uno nuevo');
            return NextResponse.json({ error: error.message }, {status: 404});
        }

        return NextResponse.json({message: "Token confirmado, ingrese su nueva contraseña"})

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}