
import { cloudinaryUploadImages } from "@/src/services/cloudinary/cloudinaryUploadImages";
import { AdminFormDataProperty } from "@/src/types/adminTypes/adminProperty";
import { formatImagesGallery } from "./formatImagesGallery";

export const uploadAndFormatImages = async (data: AdminFormDataProperty) => {
    const [currentURLSGallery, newImagesGallery] = formatImagesGallery(data.imagesGallery);
    const isNewMainImage = data.imageMain instanceof File;

    if (!isNewMainImage && newImagesGallery.length === 0) return { imageMain: data.imageMain, imagesGallery: data.imagesGallery };

    const uploadResult = await cloudinaryUploadImages({
        imageMain: isNewMainImage ? data.imageMain : "",
        imagesGallery: newImagesGallery.length > 0 ? newImagesGallery : [""] 
    });

    return {
        imageMain: isNewMainImage ? uploadResult.imageMainUrl : data.imageMain,
        imagesGallery: [...currentURLSGallery, ...uploadResult.galleryUrls]
    };
};

