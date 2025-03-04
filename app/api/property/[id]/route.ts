import { prisma } from "@/src/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ERRORS } from "@/src/utils/backend/errors/errors";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.status })

    if (session.user && session.user.email) {

      const property = await prisma.property.findFirst({
        where: { id: Number(id) },
        include: {
          user: { select: { email: true } },
          serviceToProperty: { select: { serviceId: true} },
          imagesToProperty: { select: { url: true } }
        }
      });

      if (!property)
        return NextResponse.json({ error: ERRORS.NOT_FOUND.message }, { status: ERRORS.NOT_FOUND.status })

      if (session.user.email !== property.user.email) 
        return NextResponse.json({ error: ERRORS.FORBIDDEN.message }, { status: ERRORS.FORBIDDEN.status });

      const { user, imagesToProperty, serviceToProperty, ...dataProperty } = property;
      return NextResponse.json({
        ...dataProperty,
        imagesGallery: imagesToProperty.map(img => img.url),
        services: serviceToProperty.map(service => service.serviceId.toString()) 
      })
    }
  } catch {
    return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
  }
}