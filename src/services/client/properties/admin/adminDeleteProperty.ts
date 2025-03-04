
import api from "@/src/axios/axios";
import { AdminPropertyById } from "@/src/types/adminTypes/adminProperty";
import { isAxiosError } from 'axios';

export const adminDeleteProperty = async (id: AdminPropertyById['id']) => {
    try {
        const url = `/property/delete/${id}`
        const { data } = await api.delete(url)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
