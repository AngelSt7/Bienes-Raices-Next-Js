import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import type { Selection } from "@heroui/react";
import { useAppStore } from "@/src/store/useAppStore";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type InputSearch = {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const registers = [
    { key: "5", label: "5 registros" },
    { key: "10", label: "10 registros" },
    { key: "15", label: "15 registros" },
];

export default function NavigationTable({ handleSearch }: InputSearch) {
    const take = useAppStore(state => state.take)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const setChangeTake = useAppStore(state => state.setChangeTake)
    const arrayTake = take.toString().split(' ')
    const [value, setValue] = useState<Selection>(new Set(arrayTake));
    useEffect(() => {
        setChangeTake(Number(Array.from(value)[0]));
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    }, [value])


    return (
        <div className=' flex flex-col md:flex-row md:justify-between'>
            <div className="relative">
                <input
                    type="text"
                    className="text-sm p-2 w-full bg-[#ffffff] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-xl px-3 py-2.5 outline-none pr-10 focus:ring-1 focus:ring-white/10"
                    placeholder='Ingresa tu busqueda'
                    onChange={handleSearch}
                />
                <Search
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
            </div>
            <div>
                <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                        className=" min-w-32"
                        selectedKeys={value}
                        onSelectionChange={setValue}
                    >
                        {registers.map((register) => (
                            <SelectItem key={register.key}>{register.label}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}


