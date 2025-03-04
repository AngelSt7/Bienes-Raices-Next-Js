import { prisma } from "@/src/config/prisma";
import { publicCardsSchema } from "@/src/schema/publicPropertySchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
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

        if (type) {
            let where = {};

            if (type) {
                if (type === "1") where = { typeId: Number(type) };
                else if (type === "2") where = { typeId: Number(type) };
                else if (type === "all") where = {}
            }

            if (type === '1' || type === '2') {
                const properties = await prisma.property.findMany({
                    where: where,
                    select: selections,
                    take: 8,
                    orderBy: { id: 'desc' }
                })
                const propertiesFormat = publicCardsSchema.safeParse(properties);
                return NextResponse.json(propertiesFormat.data);
            }

            if (type === 'all') {
                const [type1, type2] = await Promise.all([
                    prisma.property.findMany({
                        where: { typeId: 1 },
                        select: selections,
                        take: 5,
                        orderBy: { id: 'desc' }
                    }),
                    prisma.property.findMany({
                        where: { typeId: 2 },
                        select: selections,
                        take: 5,
                        orderBy: { id: 'desc' }
                    })
                ]);

                const mixedProperties = [];
                for (let i = 0; i < 5; i++) {
                    if (type1[i]) mixedProperties.push(type1[i]);
                    if (type2[i]) mixedProperties.push(type2[i]);
                }

                const propertiesFormat = publicCardsSchema.safeParse(mixedProperties);
                return NextResponse.json(propertiesFormat.data);
            }
        }

    } catch (error) {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
