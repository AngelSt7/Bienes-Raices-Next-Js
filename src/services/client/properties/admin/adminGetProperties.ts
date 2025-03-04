
import api from "@/src/axios/axios";
import { adminGetPropertiesSchema } from "@/src/schema/adminPropertySchema";
import { PaginationType } from "@/src/types/adminTypes/adminProperty";
import { isAxiosError } from 'axios';

export const adminGetProperties = async (pagination : PaginationType) => {
    const skip = (pagination.page - 1) * pagination.take
    try {
        const url = `/property/me/${pagination.take}/${skip}`
        const { data } = await api(url)
        const response = adminGetPropertiesSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
