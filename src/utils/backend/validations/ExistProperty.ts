import { prisma } from "@/src/config/prisma";
import { Property } from "@prisma/client";
import { NextResponse } from "next/server";

export const ExistProperty = async (id: Property['id']) => {
    const property = await prisma.property.findUnique(
        { where: { id }, include: {  user: true, } }
    )
    if (!property) {
        const error = new Error('La propiedad no existe');
        return NextResponse.json({ error: error.message }, { status: 409 })
    }
    return property
}   