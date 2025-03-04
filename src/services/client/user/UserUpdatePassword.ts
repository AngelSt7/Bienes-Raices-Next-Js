
import api from "@/src/axios/axios";
import { UserUpdatePassword } from "@/src/types/userTypes/user";
import { isAxiosError } from 'axios';

export const userUpdatePassword = async (formData : UserUpdatePassword) => {
    try {
        const url = `/user/me/updatePassword`;
        const { data } = await api.post(url, formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
