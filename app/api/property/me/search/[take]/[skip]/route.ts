import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { take: string, skip: string } }) => {
    try {
        const { take, skip } = await params;
        const session = await getServerSession(authOptions);

        if (!session) return NextResponse.json({ message: "Para buscar en tus propiedades, debes autenticarte" }, { status: 401 });

        if (session.user && session.user.email) {
            const { searchParams } = new URL(request.url);
            const content = searchParams.get('search') || '';

            const searchWords = content.split(' ')

            const searchConditions = searchWords.map(word => ({
                OR: [{
                    location: {
                        contains: word, mode: 'insensitive' as Prisma.QueryMode
                    }
                },
                {
                    district:
                    {
                        district:
                        {
                            contains: word, mode: 'insensitive' as Prisma.QueryMode
                        }
                    }
                }]
            }));

            const whereCondition: Prisma.PropertyWhereInput = { AND: searchConditions };

            const propertiesData = await prisma.property.findMany({
                where: whereCondition,
                select: {
                    id: true,
                    imageMain: true,
                    location: true,
                    price: true,
                    type: { select: { type: true } },
                    availability: true,
                    publishedAt: true,
                    currency: { select: { currency: true } }
                },
                take: Number(take),
                skip: Number(skip),
            });

            const totalPagesData = await prisma.property.count({ where: whereCondition });

            const [properties, pages] = await Promise.all([propertiesData, totalPagesData])

            return NextResponse.json({
                properties,
                pages: Math.ceil(pages / Number(take))
            });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
};
