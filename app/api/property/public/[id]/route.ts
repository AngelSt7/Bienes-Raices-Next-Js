import { prisma } from "@/src/config/prisma"
import { publicPropertyByIdSchema } from "@/src/schema/public/property"
import { ERRORS } from "@/src/utils/backend/errors/errors"
import { error } from "console"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        const property = await prisma.property.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                location: true,
                description: true,
                imageMain: true,
                area: true,
                price: true,
                terrace: true,
                elevator: true,
                furnished: true,
                parkingSpaces: true,
                bedrooms: true,
                bathrooms: true,
                latitude: true,
                longitude: true,
                yearBuilt: true,
                publishedAt: true,
                availability: true,
                user: { select: { email: true, phone: true, name: true, lastname: true } },
                district: { select: { district: true } },
                currency: { select: { currency: true } },
                type: { select: { type: true } },
                departament: { select: { departament: true } },
                imagesToProperty: { select: { url: true } },
                serviceToProperty: { select: { service: { select: { service: true } } } }
            },
        })

        if(!property)
            return NextResponse.json({error: ERRORS.NOT_FOUND.message}, {status: ERRORS.NOT_FOUND.status})

        const response = publicPropertyByIdSchema.safeParse({
            ...property,
            imagesToProperty: property?.imagesToProperty.map(image => image.url ),
            serviceToProperty: property?.serviceToProperty.map(service => service.service.service)
        })

        if(response.success) return NextResponse.json(response.data) 

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status })
    }
}
