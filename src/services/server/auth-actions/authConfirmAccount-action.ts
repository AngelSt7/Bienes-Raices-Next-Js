'use server'

import api from "@/src/axios/axios";
import { AuthToken } from "@/src/types/authTypes/auth";
import { isAxiosError } from 'axios';

export const authConfirmAccount = async (formData: AuthToken) => {
    try {
        const url = `/auth/confirm-account/${formData.token}`
        const { data } = await api(url)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
