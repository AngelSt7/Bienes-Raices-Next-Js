import { AuthEmail } from "@/src/class/AuthEmail";
import { prisma } from "@/src/config/prisma";
import { authCreateAccountSchema } from "@/src/schema/authSchema";
import { AuthCreateAccount } from "@/src/types/authTypes/auth";
import { generateToken, hashPassword } from "@/src/utils/backend/authUtils";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const body = await request.json().catch(() => ({}));

    const validation = validateData(authCreateAccountSchema, body);
    if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })

    try {
        const { name, lastname, email, password, birthDate, phone } = validation.data as AuthCreateAccount;
        const existAccount = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { phone: Number(phone) }
                ]
            }
        });

        if (existAccount)
            return NextResponse.json({ error: ERRORS.EMAIL_OR_PHONE_ALREADY_REGISTERED.message }, { status: ERRORS.EMAIL_OR_PHONE_ALREADY_REGISTERED.status });
        
        const passwordHash = await hashPassword(password)
        const limitTime = new Date();
        const expiresAt = new Date(limitTime.getTime() + 10 * 60 * 1000);
        const token = generateToken()

        const birthDateIso = new Date(birthDate).toISOString();  

        await prisma.user.create({
            data: {
                name, lastname, email, password: passwordHash, birthDate: birthDateIso, phone: Number(phone),
                token: { create: { token: parseInt(token), expiresAt } }
            }
        });

        await AuthEmail.sendConfirmationEmail({ email, name, token })
        return NextResponse.json({ message: "Usuario creado correctamente" });
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
