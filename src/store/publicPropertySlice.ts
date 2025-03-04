import { StateCreator } from "zustand";
import { PublicCard } from "../types/publicTypes/publicProperty";

export type PublicPropertySlice = {
    modalContact: boolean
    modalGalery: boolean
    imagesGalery: string[]
    propertiesFavorites: PublicCard[]
    setImagesGalery: (images: string[]) => void
    changeStatusModal: () => void
    changeStatusModalGalery: () => void
    propertyFavorite: (property: PublicCard) => void
};

export const publicPropertySlice: StateCreator<PublicPropertySlice> = (set, get) => ({
    modalContact: false,
    modalGalery: false,
    imagesGalery: [],
    propertiesFavorites: [] as PublicCard[],
    setImagesGalery: (images: string[]) => {
        set(() => ({ imagesGalery: images }))
    },
    changeStatusModal: () => {
        set((state) => ({ modalContact: !state.modalContact }))
    },
    changeStatusModalGalery: () => {
        set((state) => ({ modalGalery: !state.modalGalery }))
    },
    propertyFavorite: (property: PublicCard) => {
        const exist = get().propertiesFavorites.some(propertyFavorite => (
            propertyFavorite.id === property.id
        ))

        let properties: PublicCard[] = []

        if (exist) {
            properties = get().propertiesFavorites.filter(propertyFilter => propertyFilter.id !== property.id)
        } else {
            properties = [...get().propertiesFavorites, property]
        }
        set(() => ({
            propertiesFavorites: properties
        }))
    }
})
