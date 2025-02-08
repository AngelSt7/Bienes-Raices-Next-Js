import { prisma } from "@/src/config/prisma";
import { authConfirmAccountSchema } from "@/src/schema/authSchema";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    token: string;
};

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
    const { token } = await params;

    const validation = validateData(authConfirmAccountSchema, { token });
    if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })
    try {

        const tokenExist = await prisma.token.findFirst({ where: { token: parseInt(validation.data.token) } })

        if (!tokenExist) {
            const error = new Error("Token no existe");
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
