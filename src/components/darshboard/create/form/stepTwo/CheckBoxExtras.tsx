import { Checkbox } from "@heroui/react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AdminFormDataProperty } from "@/src/types/adminTypes/adminProperty";
import { useEffect, useRef } from "react";

type CheckBoxProps = {
    label: string;
    data: ReadonlyArray<{ key: number; data: keyof Pick<AdminFormDataProperty, 'parkingSpaces' | 'furnished' | 'terrace' | 'elevator'>; label: string }>;
    setValue: UseFormSetValue<AdminFormDataProperty>;
    watch: UseFormWatch<AdminFormDataProperty>;
    defaultData?: Partial<Pick<AdminFormDataProperty, 'parkingSpaces' | 'furnished' | 'terrace' | 'elevator'>>
};

export default function CheckBoxExtras({ label, data, setValue, watch, defaultData }: CheckBoxProps) {
    const initialized = useRef(false);

    useEffect(() => {
        data.forEach(({ data }) => setValue(data, watch(data) ? watch(data) : false, { shouldValidate: true }));
    }, [data, setValue]);
    
    return (
        <>
            <label className="text-base block font-semibold text-[#202021] dark:text-[#c5c5c7]">
                {label}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.map(({ key, data, label }) => (
                    <Checkbox
                        color="success"
                        key={key}
                        isSelected={watch(data) ?? false}
                        onValueChange={(value) => setValue(data, value, { shouldValidate: true })}
                    >
                        {label}
                    </Checkbox>
                ))}
            </div>
        </>
    );
}
