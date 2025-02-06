import { AuthEmail } from "@/src/emails/AuthEmail";
import { prisma } from "@/src/lib/prisma";
import { generateToken, hashPassword } from "@/src/utils/backend/authUtils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { name, lastname, email, password } = await request.json();
    try {
        const passwordHash = await hashPassword(password)

        const limitTime = new Date();
        const expiresAt = new Date(limitTime.getTime() + 10 * 60 * 1000);
        const token = generateToken()

        await prisma.user.create({
            data: {
                name, lastname, email, password: passwordHash,
                token: { create: { token: parseInt(token), expiresAt }}
            }
        });
        await AuthEmail.sendConfirmationEmail({ email,  name, token })
        return NextResponse.json({ message: "Usuario creado correctamente" });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
};
