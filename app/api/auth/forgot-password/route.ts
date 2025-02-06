import { prisma } from "@/src/lib/prisma";
import { UserExistNoAuth } from "@/src/services/api/UserExistNoAuth";
import { dataSendEmail } from "@/src/utils/backend/sendEmails";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { email } = await request.json()

        const userExist = await UserExistNoAuth(email)
        if (userExist instanceof NextResponse) {
            return userExist;
        }

        if (!userExist.confirmed) {
            const error = new Error('El usuario no está confirmado');
            return NextResponse.json({ error: error.message }, { status: 409 })
        }

        const tokenExist = await prisma.token.findFirst({ where: { userId: userExist.id } });
        await dataSendEmail(userExist, tokenExist!, false)
        return NextResponse.json({ message: 'Hemos enviado instrucciones para restablecer tu password a tu email' })
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}