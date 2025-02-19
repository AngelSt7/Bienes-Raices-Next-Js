import { prisma } from "@/src/config/prisma";
import { UserExistNoAuth } from "@/src/utils/backend/validations/UserExistNoAuth";
import { dataSendEmail } from "@/src/utils/backend/emailUtils";
import { NextRequest, NextResponse } from "next/server";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { authForgotPasswordSchema } from "@/src/schema/authSchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(() => ({}))
        const validation = validateData(authForgotPasswordSchema, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 });

        const { email } = validation.data
        const userExist = await UserExistNoAuth(email)
        if (userExist instanceof NextResponse) return userExist

        if (!userExist.confirmed)
            return NextResponse.json({ error: ERRORS.USER_NOT_CONFIRMED.message }, { status: ERRORS.USER_NOT_CONFIRMED.status })

        const tokenExist = await prisma.token.findFirst({ where: { userId: userExist.id } });
        await dataSendEmail(userExist, tokenExist!, false)
        return NextResponse.json({ message: 'Hemos enviado instrucciones para restablecer tu contraseña a tu email' })
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
}