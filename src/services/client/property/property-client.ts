import api from "@/src/axios/axios";
import { cardsSchema, findPropertySchema } from "@/src/schema/public";
import { errorHttp } from "@/src/utils/resolves/error";
import { PublicPropertyById } from "@/src/types";

const ROUTES = {
    CARROUSEL: `/property/carrousel`,
    CARD: `/property/card`,
    LIST: `/property/public`,
    FIND: `/property/public`,
    DETAILS: `/property/me/details`
}


export class PropertyClient {

    static carrousel = async (type: string) => {
        try {
            const url = `${ROUTES.CARROUSEL}?type=${type}`;
            const { data } = await api(url)
            const response = cardsSchema.safeParse(data)
            if (response.success) { return response.data }
        } catch (error) { errorHttp(error) }
    }

    static list = async (extra?: string) => {
        try {
            const url = `${ROUTES.CARD}/3/0?init=true&${extra}`
            const { data } = await api(url)
            const response = cardsSchema.safeParse(data)
            if (response.success)  return response.data
        } catch (error) { errorHttp(error) }
    }

    static find = async (id: PublicPropertyById['id']) => {
        try {   
            const url = `${ROUTES.FIND}/${id}`
            const { data } = await api(url)
            const response = findPropertySchema.safeParse(data)
            if(response.success) return response.data
        } catch (error) { errorHttp(error) }
    }

}