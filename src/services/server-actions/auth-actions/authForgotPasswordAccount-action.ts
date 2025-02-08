'use server'

import api from "@/src/axios/axios";
import { AuthRequestToken } from "@/src/types/authTypes";
import { isAxiosError } from 'axios';


export const authForgotPassword= async (formData: AuthRequestToken) => {
    try {
        const url = '/auth/forgot-password'
        const { data } = await api.post(url, formData)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
