'use server'

import { AuthCreateAccount } from "@/src/types/authTypes";
import { isAxiosError } from 'axios';
import api from "../axios/axios";

export const authCreateAccount = async (formData: AuthCreateAccount) => {
    try {
        const url = '/auth/create-account'
        const { data } = await api.post(url, formData)
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
