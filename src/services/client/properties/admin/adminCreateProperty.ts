
import api from "@/src/axios/axios";
import { AdminFormDataProperty } from "@/src/types/adminTypes/adminProperty";
import { isAxiosError } from 'axios';

export const adminCreateProperty = async (formData: AdminFormDataProperty) => {
    try {
        const url = `/property/create`
        const { data } = await api.post(url, formData)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
