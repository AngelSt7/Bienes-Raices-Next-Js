import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createPropertySlice, PropertySlice } from "./propertySlice";
import { PublicPropertySlice, publicPropertySlice } from "./publicPropertySlice";

export const useAppStore = create<PropertySlice & PublicPropertySlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createPropertySlice(...a),
                ...publicPropertySlice(...a),
            }),
            {
                name: "property-storage", 
                partialize: (state) => ({ 
                    take: state.take, 
                    propertiesFavorites: state.propertiesFavorites
                }),
            }
        )
    )
);
