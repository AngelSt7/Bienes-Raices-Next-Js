import { CheckboxGroup, Checkbox } from "@heroui/react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AdminFormDataProperty } from "@/src/types/adminTypes/property";

type CheckBoxProps = {
    label: string;
    data: { key: number; data: string }[];
    setValue: UseFormSetValue<AdminFormDataProperty>;
    watch: UseFormWatch<AdminFormDataProperty>;
};

export default function CheckBoxServices({ data, label, setValue, watch }: CheckBoxProps) {
    const selected = watch("services");
    const handleChange = (newValues: string[]) => setValue("services", newValues, { shouldValidate: true });

    return (
        <>
            <label className="text-base block font-semibold text-[#202021] dark:text-[#c5c5c7]">
                {label}
            </label>
            <CheckboxGroup value={selected ?? ["1"]} onValueChange={handleChange}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                    {data.map(item => (
                        <Checkbox
                            color="success"
                            isDisabled={item.key.toString() === "1"}
                            key={item.key}
                            value={item.key.toString()}
                        >
                            {item.data}
                        </Checkbox>
                    ))}
                </div>
            </CheckboxGroup>
        </>
    );
}
