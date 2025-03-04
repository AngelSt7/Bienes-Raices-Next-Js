
import api from "@/src/axios/axios";
import { PublicContactForm } from "@/src/types/publicTypes/publicProperty";
import { isAxiosError } from 'axios';
export const publicSendEmail = async (formData: PublicContactForm) => {
    try {
        const url = `/property/send-email`;
        const { data } = await api.post(url, formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
