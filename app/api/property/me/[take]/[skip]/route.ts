import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { take: string, skip: string } }) => {
  try {
    const { take, skip } = await params
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ message: "Para ver tus propiedades, debes autenticarte" }, { status: 401 })

    if (session && session.user?.email) {
      const properties = await prisma.property.findMany({
        where: { user: { email: session.user.email } },
        take: parseInt(take),
        skip: parseInt(skip)
      })
      return NextResponse.json(properties)
    }
  } catch (error) {
    return NextResponse.json({ error: 'error en el servidor' }, { status: 500 })
  }
}