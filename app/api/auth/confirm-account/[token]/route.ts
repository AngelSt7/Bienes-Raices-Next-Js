import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    token: string;
};

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
    try {
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

        await prisma.user.update({
            where: { id: tokenExist.userId },
            data: { confirmed: true }
        })

        await prisma.token.delete({ where: { id: tokenExist.id } });
        return NextResponse.json({ message: "Cuenta confirmada correctamente" });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
};
