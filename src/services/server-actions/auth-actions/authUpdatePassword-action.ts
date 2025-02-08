'use server'

import api from "@/src/axios/axios";
import { AuthToken, AuthUpdatePassword } from "@/src/types/authTypes";
import { isAxiosError } from 'axios';

type AuthPasswordType = {
    password: AuthUpdatePassword['password']
    token: AuthToken['token']
}
export const authUpdatePassword = async (formData: AuthPasswordType) => {
    try {
        const url = `/auth/update-password/${formData.token}`
        const { data } = await api.post(url, formData)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
