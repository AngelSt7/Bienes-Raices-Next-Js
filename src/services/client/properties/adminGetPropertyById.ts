
import api from "@/src/axios/axios";
import { adminGetGameByIdSchema } from "@/src/schema/adminPropertySchema";
import { AdminProperty } from "@/src/types/adminTypes/adminProperty";
import { isAxiosError } from 'axios';

type GetProperty = {
    id: AdminProperty['id'],
    token: string
}

export const adminGetPropertyById = async (formData: GetProperty) => {
    try {
        const url = `/property/${formData.id}`
        console.log(url)
        const { data } = await api(url, {
            headers: {
                'Cookie': `next-auth.session-token=${formData.token}`,
            },
        })
        const response = adminGetGameByIdSchema.safeParse(data)
        if (response.success) return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
