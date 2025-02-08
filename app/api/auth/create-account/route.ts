import { AuthEmail } from "@/src/class/AuthEmail";
import { prisma } from "@/src/config/prisma";
import { authCreateAccountSchema } from "@/src/schema/authSchema";
import { generateToken, hashPassword } from "@/src/utils/backend/authUtils";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const body = await request.json().catch(() => ({}));

    const validation = validateData(authCreateAccountSchema, body);
    if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })

    try {
        const { name, lastname, email, password } = validation.data;
        const existAccount = await prisma.user.findUnique({ where: { email } })
        if (existAccount) {
            return NextResponse.json({ error: "Este correo ya está registrado" }, { status: 500 });
        }

        const passwordHash = await hashPassword(password)
        const limitTime = new Date();
        const expiresAt = new Date(limitTime.getTime() + 10 * 60 * 1000);
        const token = generateToken()

        await prisma.user.create({
            data: {
                name, lastname, email, password: passwordHash,
                token: { create: { token: parseInt(token), expiresAt } }
            }
        });

        await AuthEmail.sendConfirmationEmail({ email, name, token })
        return NextResponse.json({ message: "Usuario creado correctamente" });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
};
