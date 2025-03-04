import { prisma } from "@/src/config/prisma";
import { publicCardsSchema } from "@/src/schema/publicPropertySchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { take: string, skip: string } }) => {
  try {
    const { take, skip } = await params
    const { searchParams } = new URL(request.url);
    const isInit = searchParams.get('init')
    const type = searchParams.get('type') || null

    const selections = {
      id: true,
      district: { select: { district: true } },
      area: true,
      location: true,
      imageMain: true,
      type: { select: { type: true } },
      bedrooms: true,
      bathrooms: true,
      price: true,
      currency: { select: { currency: true } },
      publishedAt: true
    }

    if (isInit === 'true') {
      let where = {}; 

      if (type) {
        if (type === "1") where = { typeId: 1 };
        else if (type === "2") where = { typeId: 2 };
        else if (type === null) where = {}
      }

      const properties = await prisma.property.findMany({
        where,
        select: selections,
        take: parseInt(take),
        skip: parseInt(skip),
        orderBy: { id: 'desc' }
      });

      const propertiesFormat = publicCardsSchema.safeParse(properties);
      return NextResponse.json(propertiesFormat.data);
    } else {

      const totalPagesData = prisma.property.count()
      const propertiesData = prisma.property.findMany({
        select: selections,
        take: parseInt(take),
        skip: parseInt(skip),
        orderBy: { id: 'desc' }
      })

      const [totalPages, properties] = await Promise.all([totalPagesData, propertiesData])
      return NextResponse.json({
        properties,
        pages: Math.ceil(totalPages / parseInt(take))
      })
    }
  } catch {
    return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status })
  }
}