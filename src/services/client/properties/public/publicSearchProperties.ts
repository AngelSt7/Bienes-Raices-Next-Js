
import api from "@/src/axios/axios";
import { publicCardsSearchSchema } from "@/src/schema/publicPropertySchema";
import { isAxiosError } from 'axios';

type SearchProperties = Record<string, string | undefined>;

export const publicSearchProperties = async (searchFilters: SearchProperties) => {
    try {
        const searchParams = new URLSearchParams();
        Object.entries(searchFilters).forEach(([key, value]) => {
            if (value) {
                searchParams.append(key, value);
            }
        });
        const url = `/property/search/30/0?${searchParams.toString()}`;
        const { data } = await api.get(url)
        const response = publicCardsSearchSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
