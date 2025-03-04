import { prisma } from "@/src/config/prisma";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(() => ({}));

        const { name, lastname, email, authProvider, confirmed } = body;

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: { name, lastname, email, authProvider, confirmed }
        });

        if (user.authProvider === "manual") 
            return NextResponse.json({ error: ERRORS.MANUAL_ACCOUNT_EXISTS.message }, { status: ERRORS.MANUAL_ACCOUNT_EXISTS.status });
      
        return NextResponse.json(user);

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
