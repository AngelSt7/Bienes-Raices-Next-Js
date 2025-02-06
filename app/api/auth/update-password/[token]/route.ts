import { prisma } from "@/src/lib/prisma"
import { hashPassword } from "@/src/utils/backend/authUtils";
import { NextRequest, NextResponse } from "next/server"

type Params = {
    token: string;
};

export const POST = async (request: NextRequest, { params }: { params: Params }) => {
    try {
        const { password } = await request.json()
        const { token } = await params;
        const tokenExist = await prisma.token.findFirst({ where: { token: parseInt(token) } })

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
        await prisma.token.delete({ where: { id: tokenExist.id } });

        if (!userExist) {
            const error = new Error('Usuario no encontrado')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        const passwordHash = await hashPassword(password)

        await prisma.user.update({
            where: { id: userExist.id },
            data: { password: passwordHash }
        })

        return NextResponse.json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}