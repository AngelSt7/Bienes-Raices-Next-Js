
import api from "@/src/axios/axios";
import { userSchema } from "@/src/schema/userSchema";
import { isAxiosError } from 'axios';

export const userGetInfo = async (formData : {token: string}) => {
    try {
        const url = `/user/me`;
        console.log(url)
        const { data } = await api(url, {
            headers: {
                'Cookie': `next-auth.session-token=${formData.token}`,
            },
        })
        const response = userSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
