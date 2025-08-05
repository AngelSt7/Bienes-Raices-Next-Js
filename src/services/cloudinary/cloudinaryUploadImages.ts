'use client'
import api from "@/src/axios/axios";
import { AdminFormDataProperty } from "@/src/types/adminTypes/property";
import { formatFormDataImages } from "@/src/utils/frontend/images/formDataImages";

export const cloudinaryUploadImages = async (data: Pick<AdminFormDataProperty, 'imageMain' | 'imagesGallery'>) => {
    const formDataImages = formatFormDataImages(data)
    try {
        const url = `/images`
        const { data } = await api.post(url, formDataImages)
        return data
    } catch (error) {
        console.log(error)
    }
};
