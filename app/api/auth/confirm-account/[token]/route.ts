import { prisma } from "@/src/config/prisma";
import { authConfirmAccountSchema } from "@/src/schema/authSchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server";

type Params = { token: string };

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
    const { token } = await params;

    const validation = validateData(authConfirmAccountSchema, { token });
    if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })

    try {
        const tokenExist = await prisma.token.findFirst({ where: { token: parseInt(validation.data.token) } })

        if (!tokenExist) 
            return NextResponse.json({error: ERRORS.NOT_EXIST_TOKEN.message}, {status: ERRORS.NOT_EXIST_TOKEN.status})

        const currentTime = new Date();
        const tokenExpirationTime = new Date(tokenExist.expiresAt)

        if (currentTime > tokenExpirationTime) {
            await prisma.token.delete({ where: { id: tokenExist.id } })
            return NextResponse.json({ error: ERRORS.EXPIRED_TOKEN.message }, { status: ERRORS.EXPIRED_TOKEN.status })
        }

        await prisma.user.update({
            where: { id: tokenExist.userId },
            data: { confirmed: true }
        })

        await prisma.token.delete({ where: { id: tokenExist.id } });
        return NextResponse.json({ message: "Cuenta confirmada correctamente" });
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
