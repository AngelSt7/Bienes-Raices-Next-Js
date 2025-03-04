
import api from "@/src/axios/axios";
import { adminGetDetailsPropertyInModalSchema } from "@/src/schema/adminPropertySchema";
import { AdminProperty } from "@/src/types/adminTypes/adminProperty";
import { isAxiosError } from 'axios';

export const adminGetDetailsPropertyInModal = async (id: AdminProperty['id']) => {
    try {
        const url = `/property/me/details/${id}`
        const { data } = await api(url)
        const response = adminGetDetailsPropertyInModalSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
