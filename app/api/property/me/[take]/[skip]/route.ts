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
      const totalPagesData = prisma.property.count({
        where: { user: { email: session.user.email } }
      })

      const propertiesData = prisma.property.findMany({
        where: { user: { email: session.user.email } },
        select: {
          id: true,
          imageMain: true,
          location: true,
          price: true,
          type: { select: { type: true } },
          availability: true,
          publishedAt: true,
          currency: { select : { currency: true } }
        },
        take: parseInt(take),
        skip: parseInt(skip)
      })

      const [totalPages, properties] = await Promise.all([totalPagesData, propertiesData])
      return NextResponse.json({
        properties,
        pages: Math.ceil(totalPages / parseInt(take))
      })
    }
  } catch {
    return NextResponse.json({ error: 'error en el servidor' }, { status: 500 })
  }
}