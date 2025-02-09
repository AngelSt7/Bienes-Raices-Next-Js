import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { adminEditProperty } from "@/src/schema/property";
import { ExistProperty } from "@/src/utils/backend/validations/ExistProperty";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const body = await request.json().catch(() => ({}));
        const { id } = await params

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Para editar una propiedad, debes autenticarte" }, { status: 401 });
            
        const property = await ExistProperty(parseInt(id))
        if (property instanceof NextResponse) return property

        if (session?.user?.email !== property.user.email) {
            return NextResponse.json({ message: "No tienes permiso para editar esta propiedad" }, { status: 403 });
        }

        const validation = validateData(adminEditProperty, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })

        await prisma.property.update({
            where: { id: parseInt(id) },
            data: { ...validation.data }
        })

        return NextResponse.json({ message: "Propiedad actualizada correctamnete" })
    } catch (error) {
        return NextResponse.json({ error: "No se pudo actualizar la propiedad. Verifica los datos e intenta nuevamente." }, { status: 500 });
    }
}