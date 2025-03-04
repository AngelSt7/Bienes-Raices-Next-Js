import { prisma } from "@/src/config/prisma";
import { authCompleteAccountSchema } from "@/src/schema/authSchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../[...nextauth]/route";


export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(() => ({}));

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: ERRORS.AUTH_REQUIRED_COMPLETE_ACCOUNT.message }, { status: ERRORS.AUTH_REQUIRED_COMPLETE_ACCOUNT.status })

        const validations = validateData(authCompleteAccountSchema, body)
        if (!validations.success) return NextResponse.json({ errors: validations.errors }, { status: 400 })

            if (session.user && session.user.email) {
                const { name, lastname, birthDate, phone } = validations.data;
            
                const [user, phoneExists] = await Promise.all([
                    prisma.user.findUnique({
                        where: { email: session.user.email }
                    }),
                    prisma.user.findFirst({
                        where: { phone: Number(phone) }
                    })
                ]);
            
                if (!user) return NextResponse.json({ error: ERRORS.USER_NOT_FOUND.message }, { status: ERRORS.USER_NOT_FOUND.status });
            
                if (phoneExists) {
                    return NextResponse.json({ error: ERRORS.PHONE_EXIST.message }, { status: ERRORS.PHONE_EXIST.status });
                }
            
                if (user.authProvider === "manual")
                    return NextResponse.json({ error: ERRORS.MANUAL_ACCOUNT_EXISTS.message }, { status: ERRORS.MANUAL_ACCOUNT_EXISTS.status });
            
                const birthDateIso = new Date(birthDate).toISOString();
            
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        name,
                        lastname,
                        phone: Number(phone),
                        birthDate: birthDateIso
                    }
                });
            
                return NextResponse.json({ message: 'Perfil completado con éxito' });
            }
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
