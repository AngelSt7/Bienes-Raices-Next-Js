
import api from "@/src/axios/axios";
import { User, UserUpdatePhone } from "@/src/types/userTypes/user";
import { isAxiosError } from 'axios';

export const userUpdatePhone = async (formData : UserUpdatePhone) => {
    try {
        const url = `/user/me/updatePhone`;
        const { data } = await api.post(url, formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
