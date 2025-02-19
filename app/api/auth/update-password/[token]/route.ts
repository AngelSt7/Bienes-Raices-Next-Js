import { prisma } from "@/src/config/prisma"
import { authTokenSchema, authUpdatePasswordSchema } from "@/src/schema/authSchema";
import { hashPassword } from "@/src/utils/backend/authUtils";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server"

type Params = { token: string };

export const POST = async (request: NextRequest, { params }: { params: Params }) => {
    try {
        const body = await request.json().catch(() => ({}))
        const { token } = await params;

        const validationBody = validateData(authUpdatePasswordSchema, { password: body.password, repeatPassword: body.password });
        const validationParam = validateData(authTokenSchema, { token });

        if (!validationBody.success || !validationParam.success) {
            return NextResponse.json({
                errors: validationBody.errors || validationParam.errors
            }, { status: 400 });
        }

        const tokenExist = await prisma.token.findFirst({ where: { token: parseInt(validationParam.data.token) } })

        if (!tokenExist)
            return NextResponse.json({ error: ERRORS.NOT_EXIST_TOKEN.message }, { status: ERRORS.NOT_EXIST_TOKEN.status })

        const currentTime = new Date();
        const tokenExpirationTime = new Date(tokenExist.expiresAt)

        if (currentTime > tokenExpirationTime) {
            await prisma.token.delete({ where: { id: tokenExist.id } })
            return NextResponse.json({ error: ERRORS.EXPIRED_TOKEN.message }, { status: ERRORS.EXPIRED_TOKEN.status })
        }

        const userExist = await prisma.user.findUnique({ where: { id: tokenExist.userId } })
        if (!userExist)
            return NextResponse.json({ error: ERRORS.USER_NOT_FOUND.message }, { status: ERRORS.USER_NOT_FOUND.status })

        const passwordHash = await hashPassword(validationBody.data.password)
        await prisma.user.update({
            where: { id: userExist.id },
            data: { password: passwordHash }
        })

        await prisma.token.delete({ where: { id: tokenExist.id } });
        return NextResponse.json({ message: "Contraseña actualizada correctamente" });

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
}