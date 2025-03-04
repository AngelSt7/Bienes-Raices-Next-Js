'use server'

import api from "@/src/axios/axios";
import { AuthCompleteAccount } from "@/src/types/authTypes/auth";
import { serverGetCookie } from "@/src/utils/backend/cookiesUtils";
import { isAxiosError } from 'axios';

export const authCompleteAccount = async (formData: AuthCompleteAccount) => {
    try {
        const token = await serverGetCookie()     
        const url = `/auth/google/complete-account`

        const { data } = await api.post(url, formData, {
            headers: {
                'Cookie': `next-auth.session-token=${token}`,
            },
        })
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
