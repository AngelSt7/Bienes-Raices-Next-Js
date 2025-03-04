import { ERRORS } from "@/src/utils/backend/errors/errors";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { userSchema } from "@/src/schema/userSchema";

export const GET = async (request: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: ERRORS.UNAUTHORIZED_INFO.message }, { status: ERRORS.UNAUTHORIZED_INFO.status })

        if (session.user && session.user.email) {
            const user = await prisma.user.findUnique({ where: { email: session.user.email } })
            if (!user) return NextResponse.json({ error: ERRORS.USER_NOT_FOUND.message }, { status: ERRORS.USER_NOT_FOUND.status })
            const filterData = userSchema.safeParse(user)
            return NextResponse.json(filterData.data)
        }

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
