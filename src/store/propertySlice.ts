import { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PaginationType } from "../types/adminTypes/adminProperty";

export type PropertySlice = {
    deleteId: number | null;
    take: number;
    setChangeTake: (take: PaginationType['take']) => void;
    setDeleteId: (id: number) => void;
    removeDeleteId: () => void;
};


export const createPropertySlice: StateCreator<PropertySlice> = (set, get) => ({
    deleteId: null,
    take: 10,
    setChangeTake: (take) => { set(()=>({ take }))},
    setDeleteId: (id)=> { set(()=>({ deleteId: id })) }, 
    removeDeleteId: ()=> { set(()=>({ deleteId: null })) }, 
})
