import { prisma } from "@/src/config/prisma"
import { UserExistNoAuth } from "@/src/utils/backend/validations/UserExistNoAuth"
import { dataSendEmail } from "@/src/utils/backend/emailUtils";
import { NextRequest, NextResponse } from "next/server"
import { validateData } from "@/src/utils/backend/validations/validateData";
import { authRequestTokenSchema } from "@/src/schema/authSchema";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(() => ({}));

        const validation = validateData(authRequestTokenSchema, body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.errors }, { status: 400 });
        }

        const {email} = validation.data
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