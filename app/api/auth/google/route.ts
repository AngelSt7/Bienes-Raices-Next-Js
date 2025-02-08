import { prisma } from "@/src/config/prisma";
import { authCreateAccountGoogleSchema } from "@/src/schema/authSchema";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const body = await request.json().catch(() => ({}));

    const validation = validateData(authCreateAccountGoogleSchema, body);
    if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })

    try {
        const { name, lastname, email, authProvider, confirmed } = validation.data;

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: { name, lastname, email, authProvider, confirmed }
        });

        if (user.authProvider === "manual") {
            return NextResponse.json({ error: "El usuario ya fue registrado de forma manual" }, { status: 400 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
};
