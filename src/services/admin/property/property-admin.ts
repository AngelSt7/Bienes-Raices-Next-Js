import api from "@/src/axios/axios"
import { detailsPropertySchema, findPropertySchema, listPropertiesSchema } from "@/src/schema/admin/property/property"
import { AdminProperty, FormDataProperty, PaginationType } from "@/src/types/adminTypes"
import { errorHttp } from "@/src/utils/resolves/error"

const ROUTES = {
    CHANGE_STATUS: `/property/status`,
    CREATE: `/property/create`,
    EDIT: `/property/edit`,
    FIND: `/property`,
    LIST: `/property/me`,
    DETAILS: `/property/me/details`
}

export class PropertyAdmin {

    static create = async (formData: FormDataProperty) => {
        try {
            const url = ROUTES.CREATE
            const { data } = await api.post(url, formData)
            return data.message;
        } catch (error) { errorHttp(error) }
    }

    static list = async (pagination: PaginationType) => {
        const skip = (pagination.page - 1) * pagination.take
        try {
            const url = `${ROUTES.LIST}/${pagination.take}/${skip}`
            const { data } = await api(url)
            const response = listPropertiesSchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { errorHttp(error) }
    };

    static find = async (id: AdminProperty['id']) => {
        try {
            const url = `${ROUTES.FIND}/${id}`
            const { data } = await api(url)
            const response = findPropertySchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { errorHttp(error) }
    }

    static edit = async (formData: FormDataProperty) => {
        try {
            const { id, ...rest } = formData
            const url = `${ROUTES.EDIT}/${id}`
            const { data } = await api.put(url, rest)
            return data.message;
        } catch (error) { errorHttp(error) }
    }

    static details = async (id: AdminProperty['id']) => {
        try {
            const url = `${ROUTES.DETAILS}/${id}`
            const { data } = await api(url)
            const response = detailsPropertySchema.safeParse(data)
            if (response.success) {
                return response.data
            }
        } catch (error) { errorHttp(error) }
    };

    static changeStatus = async (id: AdminProperty['id']) => {
        try {
            const url = `${ROUTES.CHANGE_STATUS}/${id}`
            const { data } = await api.put(url)
            return data.message;
        } catch (error) { errorHttp(error) }
    }

}