
import api from "@/src/axios/axios";
import { publicCardsSchema } from "@/src/schema/publicPropertySchema";
import { isAxiosError } from 'axios';

export const publicCarrouselProperties = async (type : string) => {
    try {
        const url = `/property/carrousel?type=${type}`;
        const { data } = await api(url)
        const response = publicCardsSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
