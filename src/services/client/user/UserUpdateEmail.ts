
import api from "@/src/axios/axios";
import { UserUpdateEmail, UserUpdatePassword } from "@/src/types/userTypes/user";
import { isAxiosError } from 'axios';

export const userUpdateEmail = async (formData : UserUpdateEmail) => {
    try {
        const url = `/user/me/updateEmail`;
        const { data } = await api.post(url, formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
