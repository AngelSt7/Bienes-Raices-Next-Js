import api from "@/src/axios/axios";
import { publicPropertyByIdSchema } from "@/src/schema/publicPropertySchema";
import { PublicPropertyById } from "@/src/types/publicTypes/publicProperty";
import { isAxiosError } from "axios";

export const publicGetPropertyById = async (id: PublicPropertyById['id']) => {
    try {   
        const url = `/property/public/${id}`
        console.log(url)
        const { data } = await api(url)
        const response = publicPropertyByIdSchema.safeParse(data)
        if(response.success)
            return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}