import { prisma } from "@/src/config/prisma";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { NextRequest, NextResponse } from "next/server";

type where = {
    districtId?: number
    currencyId?: number
    typeId?: number
    price?: {
        gte?: number
        lte?: number
    }
    bedrooms?: {
        gte?: number
        lte?: number
    }
}

export const GET = async (request: NextRequest, { params }: { params: { take: string, skip: string } }) => {
    try {
        const { take, skip } = await params;
        const { searchParams } = new URL(request.url);

        const districtId = searchParams.get('districtId');
        const typeId = searchParams.get('typeId');
        const currencyId = searchParams.get('currencyId');
        const minBedroom = searchParams.get('minBedroom');
        const maxBedroom = searchParams.get('maxBedroom');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        let where: where = {};

        if (districtId) where.districtId = Number(districtId);
        if (typeId) where.typeId = Number(typeId);
        if (currencyId) where.currencyId = Number(currencyId);

        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice ? { gte: Number(minPrice) } : {}),
                ...(maxPrice ? { lte: Number(maxPrice) } : {})
            };
        }

        if (minBedroom || maxBedroom) {
            where.bedrooms = {
                ...(minBedroom ? { gte: Number(minBedroom) } : {}),
                ...(maxBedroom ? { lte: Number(maxBedroom) } : {})
            };
        }

        const propertiesData = prisma.property.findMany({
            where,
            select: {
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
            },
            take: Number(take),
            skip: Number(skip),
        });

        const totalPages = prisma.property.count({ where })

        const [properties, pages] = await Promise.all([propertiesData, totalPages])

        if(properties.length === 0)
            return NextResponse.json({ error: ERRORS.NOT_RESULTS.message}, {status: ERRORS.NOT_RESULTS.status})
        
        return NextResponse.json({
            properties,
            pages: Math.ceil(pages / Number(take))
        });

    } catch (error) {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
