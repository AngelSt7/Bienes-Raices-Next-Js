import { prisma } from "@/src/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, {params}: {params : {take: string, skip: string}}) => {
  try {
    const { take, skip } = await params
    const totalPagesData = prisma.property.count()
    const propertiesData = prisma.property.findMany({
      select: {
        district: {
          select: { district: true }
        },
        area: true,
        bedrooms: true,
        bathrooms: true,
        parkingSpaces: true,
        price: true,
        currency: true,
        yearBuilt: true,
        images: true
      },
      take: parseInt(take),
      skip: parseInt(skip)
    })

    const [totalPages, properties] = await Promise.all([totalPagesData, propertiesData])

    return NextResponse.json({
      properties,
      pages: Math.ceil(totalPages/parseInt(take))
    })
  } catch (error) {
    return NextResponse.json({ error: 'error en el servidor' }, { status: 500 })
  }
}