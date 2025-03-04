'use client'

import { useAppStore } from "@/src/store/useAppStore";
import { IoCall } from "react-icons/io5";

export default function ToopLipContact() {

    const changeStatusModal = useAppStore((state)=>state.changeStatusModal)

    return (
        <div className=" xmd:hidden fixed bottom-2 right-2 z-10">
            <div className="absolute top-2 -left-[92px] bg-[#e3a400] text-white px-3 py-1 rounded-md text-xs whitespace-nowrap">
                Contactar
                <div className="absolute top-[50%] -right-1 w-2 h-2 bg-[#e3a400] transform rotate-45 translate-y-[-50%]"></div>
            </div>
            <button onClick={()=>changeStatusModal()} className="h-12 w-12 bg-[#e3a400] rounded-full text-white flex items-center justify-center" type="button">
                <IoCall className="w-6 h-6" />
            </button>
        </div>
    )
}
