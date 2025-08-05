import { prisma } from "@/src/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { getDataToJson } from "@/src/utils/backend/formatData/formatData";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { adminFormDataPropertySchema } from "@/src/schema/admin/property/property";
import { getCoordinates } from "@/src/utils/backend/coordinates/coordinates";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json().catch(() => ({}));

    const validation = validateData(adminFormDataPropertySchema, body)
    if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })

    const { data, imagesGallery, services } = getDataToJson(validation.data)

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: ERRORS.AUTH_REQUIRED_CREATE_PROPERTY.message }, { status: ERRORS.AUTH_REQUIRED_CREATE_PROPERTY.status })

    if (session.user && session.user.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } })
      if (!user) return NextResponse.json({ message: ERRORS.USER_NOT_FOUND.message }, { status: ERRORS.USER_NOT_FOUND.status });

      const district = await prisma.district.findUnique({where: { id: Number(validation.data.districtId) }})
      const address = await getCoordinates(`${validation.data.location}, ${district}, Lima, Perú`)

      await prisma.property.create({
        data: {
          ...data, userId: user.id,
          latitude: address?.lat,
          longitude: address?.lng,          
          imagesToProperty: {
            create: imagesGallery.map(imageGallery => ({
              url: imageGallery.toString()
            }))
          },
          serviceToProperty: {
            create: services.map(service => ({
              serviceId: Number(service)
            }))
          }
        }
      })
      return NextResponse.json({ message: "Propiedad creada correctamente" });
    }
  } catch {
    return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
  }
};
