import { prisma } from "@/src/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { adminCreateProperty } from "@/src/schema/property";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json().catch(()=>({}));
    
    const validation = validateData(adminCreateProperty, body)
    if(!validation.success) return NextResponse.json({errors: validation.errors}, {status: 400})

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "Para crear una propiedad, debes autenticarte" }, { status: 401 })

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } })
      if (!user) return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
      await prisma.property.create({ data: { ...validation.data, userId: user?.id } });
      return NextResponse.json({ message: "Propiedad creada correctamente" });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
};
