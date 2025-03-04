
import api from "@/src/axios/axios";
import { adminGetPropertiesSchema } from "@/src/schema/adminPropertySchema";
import { PaginationType } from "@/src/types/adminTypes/adminProperty";
import { isAxiosError } from 'axios';

type SearchProperties = {
    page: PaginationType['page']
    take: PaginationType['take']
    search: string
}

export const adminSearchProperties = async (dataSearch: SearchProperties) => {
    const skip = ( dataSearch.page - 1 ) * dataSearch.take
    try {
        const url = `/property/me/search/${dataSearch.take}/${skip}?search=${encodeURIComponent(dataSearch.search)}`
        const { data } = await api(url)
        const response = adminGetPropertiesSchema.safeParse(data)
        console.log(response)
        if(response.success) return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
