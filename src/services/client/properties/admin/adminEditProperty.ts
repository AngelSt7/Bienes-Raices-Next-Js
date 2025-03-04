
import api from "@/src/axios/axios";
import { AdminFormDataProperty, AdminProperty } from "@/src/types/adminTypes/adminProperty";
import { isAxiosError } from 'axios';

type EditProperty = {
    data : AdminFormDataProperty,
    id: AdminProperty['id']
}

export const adminEditProperty = async (formData: EditProperty) => {
    try {
        const url = `/property/edit/${formData.id}`
        const { data } = await api.put(url, formData.data)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
