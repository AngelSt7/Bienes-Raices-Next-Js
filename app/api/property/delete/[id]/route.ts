import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { ExistProperty } from "@/src/utils/backend/validations/ExistProperty";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Para editar una propiedad, debes autenticarte" }, { status: 401 });

        const property = await ExistProperty(parseInt(id))
        if (property instanceof NextResponse) return property

        if (session?.user?.email !== property.user.email) {
            return NextResponse.json({ message: "No tienes permiso para eliminar esta propiedad" }, { status: 403 });
        }

        await prisma.property.delete({ where: { id: parseInt(id) } })
        return NextResponse.json({ message: "Propiedad eliminada correctamnete" })
    } catch (error) {
        return NextResponse.json({ error: 'error en el servidor' }, { status: 500 })
    }
}