import { AdminFormDataProperty } from "@/src/types/adminTypes/adminProperty";

export const getDataToJson = (formData: AdminFormDataProperty) => {
    const { districtId, location, area, yearBuilt, typeId, bedrooms, bathrooms, parkingSpaces, furnished, terrace, elevator, description, price, currencyId, imageMain } = formData
    const { services } = formData
    const { imagesGallery } = formData

    return {
        data: {
            districtId,
            location,
            area,
            yearBuilt,
            typeId,
            bedrooms,
            bathrooms,
            parkingSpaces,
            furnished,
            terrace,
            elevator,
            description,
            price,
            currencyId,
            imageMain: imageMain.toString()
        },
        services,
        imagesGallery: imagesGallery as string[]
    }
}
