'use server'

import api from "@/src/axios/axios";
import { AuthRequestToken } from "@/src/types/authTypes/auth";
import { isAxiosError } from 'axios';

export const authRequestToken = async (formData: AuthRequestToken) => {
    try {
        const url = '/auth/request-token'
        const { data } = await api.post(url, formData)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
