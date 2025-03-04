

import { Select, SelectItem } from "@heroui/react";

export const districts = [
    { key: 1, label: "miraflores" },
    { key: 2, label: "san isidro" },
    { key: 3, label: "barranco" },
    { key: 4, label: "la molina" },
    { key: 5, label: "surco" },
];

export default function SelectDistrict() {
    return (
        <div className=" flex flex-col w-full gap-2">
            <label
                htmlFor={`input-districtId`}
                className="text-base font-semibold  text-[#202021] dark:text-[#c5c5c7]"
            >
                Distrito
            </label>

            <Select
                className="w-full"
                items={districts}
                placeholder="Selecciona un distrito"
                size="lg"
            >
                {(district) => <SelectItem>{district.label}</SelectItem>}
            </Select>
        </div>
    );
}
