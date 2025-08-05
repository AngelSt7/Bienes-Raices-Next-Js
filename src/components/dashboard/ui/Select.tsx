import { AdminFormDataProperty } from "@/src/types/adminTypes/property";
import { Merge, Select as SelectGroup, SelectItem } from "@heroui/react";
import { UseFormSetValue, UseFormWatch, UseFormRegister, FieldError, FieldErrorsImpl } from "react-hook-form";
import ErrorsAuth from "../../ui/errors/ErrorsAuth";
import { RefObject } from "react";

type SelectDistrictProps = {
    label: string;
    name: keyof AdminFormDataProperty; 
    data: { key: number; label: string }[];
    placeholder: string;
    register?: ReturnType<UseFormRegister<AdminFormDataProperty>>
    setValue: UseFormSetValue<AdminFormDataProperty>;
    watch: UseFormWatch<AdminFormDataProperty>;
    errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    defaultData?:  number
};

export default function Select({ register, label, name, data, placeholder, setValue, watch, errorMessage }: SelectDistrictProps) {
    const selectedValue = watch(name);
    const handleChange = (value: string) => setValue(name, Number(value), { shouldValidate: true }) 

    return (
        <div className="flex flex-col w-full gap-2">
            <label htmlFor={name} className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
                {label}
            </label>

            <input type="hidden" {...register} />

            <SelectGroup
                className={`w-full ${errorMessage ? 'ring-1 ring-[#d10b30] rounded-xl' : ''}`}
                items={data}
                placeholder={placeholder}
                size="lg"
                selectedKeys={selectedValue ? [selectedValue.toString()] : []} 
                onSelectionChange={(keys) => handleChange(Array.from(keys)[0] as string)}
            >
                {(item) => <SelectItem key={item.key} value={item.key.toString()}>{item.label}</SelectItem>}
            </SelectGroup>
               {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    );
}
