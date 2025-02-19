import { Cloudinary } from "@/src/class/Cloudinary";
import { prisma } from "@/src/config/prisma";
import { AdminFormDataProperty } from "@/src/types/adminTypes/adminProperty"
import { ImagesToProperty, Property, ServiceToProperty } from "@prisma/client"
import { getPublicId } from "../../frontend/images";

type addAndRemove = {
    id: Property['id'],
    frontServices: AdminFormDataProperty['services'],
    serviceToProperty: {
        id: ServiceToProperty['id'];
        serviceId: ServiceToProperty['serviceId'];
    }[],
    frontImages: AdminFormDataProperty['imagesGallery'],
    imagesToProperty: {
        id: ImagesToProperty['id'];
        url: ImagesToProperty['url'];
    }[];
}

export const addAndRemoveServices = async (data: Pick<addAndRemove, 'frontServices' | 'serviceToProperty' | 'id'>) => {
    const addServices = data.frontServices
        .map(Number)
        .filter(serviceId =>
            !data.serviceToProperty.some(dbService => dbService.serviceId === serviceId)
        );

    const removeServices = data.serviceToProperty
        .filter(dbService => !data.frontServices.map(Number).includes(dbService.serviceId))
        .map(dbService => dbService.id);

    const promises: Promise<any>[] = [];

    if (addServices.length > 0) {
        promises.push(
            prisma.serviceToProperty.createMany({
                data: addServices.map(serviceId => ({
                    propertyId: data.id,
                    serviceId: serviceId
                }))
            })
        );
    }

    if (removeServices.length > 0) {
        promises.push(
            prisma.serviceToProperty.deleteMany({
                where: { id: { in: removeServices } }
            })
        );
    }
    await Promise.all(promises);
}

export const addAndRemoveImages = async (data: Pick<addAndRemove, 'frontImages' | 'imagesToProperty' | 'id'>) => {

    const addImages = data.frontImages.filter(image =>
        !data.imagesToProperty.some(dbImage => dbImage.url === image)
    ) as string[];

    const removeImages = data.imagesToProperty
        .filter(dbImage => !data.frontImages.includes(dbImage.url))
        .map(dataImage => dataImage);

    const promises: Promise<any>[] = [];

    removeImages.map(removeImage => {
        const publicId = getPublicId(removeImage.url)
        promises.push(Cloudinary.deleteImage(publicId))
    })

    if (addImages.length > 0  ) {
        promises.push(
            prisma.imagesToProperty.createMany({
                data: addImages.map(imageUrl => ({
                    propertyId: data.id,
                    url: imageUrl
                }))
            })
        )
    }

    if (removeImages.length > 0) {
        promises.push(
            prisma.imagesToProperty.deleteMany({
                where: { id: { in: removeImages.map(removeId => removeId.id) } }
            })
        )
    }
    await Promise.all(promises);
}