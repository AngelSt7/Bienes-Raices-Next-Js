import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { adminGetDetailsPropertyInModalSchema } from "@/src/schema/admin/property/property";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        const session = await getServerSession(authOptions)

        if (!session) return NextResponse.json({ error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.status })

        if (session.user && session.user.email) {

            const detailsProperty = await prisma.property.findUnique({
                where: { id: Number(id) },
                select: {
                    id: true,
                    location: true,
                    price: true,
                    imageMain: true,
                    availability: true,
                    type: { select: { type: true } },
                    bedrooms: true,
                    bathrooms: true,
                    area: true,
                    yearBuilt: true,
                    publishedAt: true,
                    district: { select: { district: true } },
                    departament: { select: { departament: true } },
                    currency: { select: { currency: true } },
                    serviceToProperty: { select: { service: { select: { service: true } } } },
                    user: { select: { email: true } }
                }
            });

            if (!detailsProperty)
                return NextResponse.json({ error: ERRORS.NOT_FOUND.message }, { status: ERRORS.NOT_FOUND.status });

            if (session.user.email !== detailsProperty.user.email)
                return NextResponse.json({ error: ERRORS.FORBIDDEN.message }, { status: ERRORS.FORBIDDEN.status });

            const responseDetails = adminGetDetailsPropertyInModalSchema.safeParse({...detailsProperty,
                serviceToProperty: detailsProperty.serviceToProperty.map(s => s.service),
                publishedAt: detailsProperty.publishedAt.toString()
            })
            
            if(responseDetails.success){
                return NextResponse.json(responseDetails.data)
            }
        }

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
}