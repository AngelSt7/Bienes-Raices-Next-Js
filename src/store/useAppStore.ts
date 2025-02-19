import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createPropertySlice, PropertySlice } from "./propertySlice";

export const useAppStore = create<PropertySlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createPropertySlice(...a),
            }),
            {
                name: "property-storage", // Nombre en localStorage
                partialize: (state) => ({ take: state.take }), // Solo guarda `take`
            }
        )
    )
);
