'use server'

import api from "@/src/axios/axios";
import { AuthToken } from "@/src/types/authTypes/auth";
import { isAxiosError } from 'axios';

export const authValidateToken = async (formData: AuthToken) => {
    try {
        const url = '/auth/validate-token'
        const { data } = await api.post(url, formData)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
