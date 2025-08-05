import { AdminModalProperty } from "@/src/types/adminTypes/property";
import { Image } from "@heroui/react";
import NextImage from "next/image";

type ImageModalProps = {
    detailsPropertyModal: AdminModalProperty
}

export default function ImageModal({detailsPropertyModal} : ImageModalProps) {
    return (
        <div className="relative w-full">
            <Image
                alt="Imagen de propiedad"
                as={NextImage}
                src={detailsPropertyModal.imageMain}
                layout="responsive"
                width={700}
                height={300}
                className="object-cover rounded-xl shadow-lg"
            />
            <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-[#f5a524] dark:text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium">
                {detailsPropertyModal.type.type}
            </div>
        </div>
    )
}
