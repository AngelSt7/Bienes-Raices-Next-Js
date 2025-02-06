import { prisma } from "@/src/lib/prisma"
import { UserExistNoAuth } from "@/src/services/api/UserExistNoAuth"
import { dataSendEmail } from "@/src/utils/backend/sendEmails"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        const { email } = await request.json()

        const userExist = await UserExistNoAuth(email)
        if (userExist instanceof NextResponse) {
            return userExist;
        }

        const tokenExist = await prisma.token.findFirst({ where: { userId: userExist.id } })
        await dataSendEmail(userExist, tokenExist!, true);
        return NextResponse.json({ message: "Hemos enviado un nuevo token a su email para confirmar su cuenta" })

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}