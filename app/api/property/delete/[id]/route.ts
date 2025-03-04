import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { ExistProperty } from "@/src/utils/backend/validations/ExistProperty";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: ERRORS.AUTH_REQUIRED_DELETE_PROPERTY.message }, { status: ERRORS.AUTH_REQUIRED_DELETE_PROPERTY.status })

        if (session.user && session.user.email) {

            const property = await ExistProperty(parseInt(id))
            if (property instanceof NextResponse) return property

            if (session.user.email !== property.user.email)
                return NextResponse.json({ error: ERRORS.FORBIDDEN_DELETE_PROPERTY.message }, { status: ERRORS.FORBIDDEN_DELETE_PROPERTY.status });

            await prisma.property.delete({ where: { id: parseInt(id) } })
            return NextResponse.json({ message: "Propiedad eliminada correctamnete" })
        }
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status })
    }
}