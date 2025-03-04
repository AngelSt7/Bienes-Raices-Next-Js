import { ERRORS } from "@/src/utils/backend/errors/errors";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { userUpdateEmailSchema } from "@/src/schema/userSchema";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(() => ({}))
        const validation = validateData(userUpdateEmailSchema, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: ERRORS.UNAUTHORIZED_INFO.message }, { status: ERRORS.UNAUTHORIZED_INFO.status })

        if (session.user && session.user.email) {
            const userSession = await prisma.user.findUnique({ where: { email: session.user.email } })
            if (!userSession)
                return NextResponse.json({ error: ERRORS.USER_NOT_FOUND.message }, { status: ERRORS.USER_NOT_FOUND.status })

            if (userSession.authProvider === 'google')
                return NextResponse.json({ error: ERRORS.EXTERNAL_PROVIDER_UPDATE.message }, { status: ERRORS.EXTERNAL_PROVIDER_UPDATE.status })

            const user = await prisma.user.findFirst({ where: { email: validation.data.email } })

            if (user && user.email !== userSession.email)
                return NextResponse.json({ error: ERRORS.EMAIL_ALREADY_REGISTERED.message }, { status: ERRORS.EMAIL_ALREADY_REGISTERED.status })

            await prisma.user.update({
                where: { id: userSession.id },
                data: { email: validation.data.email }
            })
            return NextResponse.json({ message: "Credenciales actualizadas correctamente" })
        }
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
