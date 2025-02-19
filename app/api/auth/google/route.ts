import { prisma } from "@/src/config/prisma";
import { authCreateAccountGoogleSchema } from "@/src/schema/authSchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(() => ({}));

        const validation = validateData(authCreateAccountGoogleSchema, body);
        if (!validation.success) 
            return NextResponse.json({ errors: validation.errors }, { status: 400 });

        const { name, lastname, email, authProvider, confirmed } = validation.data;

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: { name, lastname, email, authProvider, confirmed }
        });

        if (user.authProvider === "manual") 
            return NextResponse.json({ error: ERRORS.MANUAL_ACCOUNT_EXISTS.message }, { status: ERRORS.MANUAL_ACCOUNT_EXISTS.status });
      
        return NextResponse.json({ message: "Usuario autenticado con Google", user });

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
