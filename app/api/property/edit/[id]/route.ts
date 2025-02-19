import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Cloudinary } from "@/src/class/Cloudinary";
import { prisma } from "@/src/config/prisma";
import { adminFormDataPropertySchema } from "@/src/schema/adminPropertySchema";
import { addAndRemoveImages, addAndRemoveServices } from "@/src/utils/backend/addAndRemove";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { getDataToJson } from "@/src/utils/backend/formatData/formatData";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { getPublicId } from "@/src/utils/frontend/images";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const body = await request.json().catch(() => ({}));
        const { id } = params;

        const session = await getServerSession(authOptions);
        if (!session)
            return NextResponse.json({ message: ERRORS.AUTH_REQUIRED_EDIT_PROPERTY.message }, { status: ERRORS.AUTH_REQUIRED_EDIT_PROPERTY.status });

        if (session.user && session.user.email) {
            const property = await prisma.property.findUnique({
                where: { id: Number(id) },
                select: {
                    id: true,
                    imagesToProperty: { select: { id: true, url: true } },
                    serviceToProperty: { select: { id: true, serviceId: true } },
                    user: { select: { email: true } },
                    imageMain: true
                }
            });

            if (!property)
                return NextResponse.json({ message: ERRORS.NOT_FOUND.message }, { status: ERRORS.NOT_FOUND.status });

            if (session.user.email !== property.user.email)
                return NextResponse.json({ error: ERRORS.FORBIDDEN_EDIT_PROPERTY.message }, { status: ERRORS.FORBIDDEN_EDIT_PROPERTY.status });

            const validation = validateData(adminFormDataPropertySchema, body);
            if (!validation.success)
                return NextResponse.json({ errors: validation.errors }, { status: 400 });

            const promises = [];

            if(property.imageMain !== validation.data.imageMain){
                const publicId = getPublicId(property.imageMain)
                promises.push(Cloudinary.deleteImage(publicId))
            }
            
            promises.push(addAndRemoveServices({frontServices: validation.data.services, serviceToProperty: property.serviceToProperty, id: property.id}))
            promises.push(addAndRemoveImages({frontImages : validation.data.imagesGallery, imagesToProperty: property.imagesToProperty, id: property.id}))

            await Promise.all(promises)
            const { data: updateData } = getDataToJson(validation.data);

            await prisma.property.update({
                where: { id: parseInt(id) },
                data: { ...updateData }
            });
            return NextResponse.json({ message: "Propiedad actualizada correctamente" });
        }

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
