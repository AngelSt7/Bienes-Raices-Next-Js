import { AdminFormDataProperty } from "@/src/types/adminTypes/property";

export const formatFormDataImages = (data: Pick<AdminFormDataProperty, 'imageMain' | 'imagesGallery'>) => {
  const formData = new FormData();
  let hasFiles = false;

  if (data.imageMain instanceof File) {
    formData.append("imageMain", data.imageMain);
    hasFiles = true;
  }
  
  if (data.imagesGallery && data.imagesGallery.length > 0 && data.imagesGallery[0] !== '') {
    data.imagesGallery.forEach((image) => {
      if (image instanceof File) {
        formData.append("imagesGallery", image);
        hasFiles = true;
      }
    });
  }

  return hasFiles ? formData : null; 
};
