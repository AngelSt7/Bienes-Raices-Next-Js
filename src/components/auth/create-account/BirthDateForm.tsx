import { Dispatch, SetStateAction, useState } from "react";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import { DateInput } from "@heroui/react";
import { useDateFormatter } from "@react-aria/i18n";
import toast from "react-hot-toast";

type BirthDateFormProps = {
    setBirthDateCheck: Dispatch<SetStateAction<boolean>>;
    setBirthDate: Dispatch<SetStateAction<string | undefined>>
};

export default function BirthDateForm({ setBirthDateCheck, setBirthDate }: BirthDateFormProps) {
    const [value, setValue] = useState<DateValue | null>(null);

    const handleValidation = () => {
        if (!value) {
            toast.error("La fecha de nacimiento es obligatoria.");
            setBirthDateCheck(false);
            return;
        }

        const birthDate = value.toDate(getLocalTimeZone());
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        const isUnder18 = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

        if (isUnder18) {
            toast.error("Debes tener al menos 18 años.");
            setBirthDateCheck(false);
        } else {
            setBirthDateCheck(true);
            setBirthDate(`${value.year}-${value.month < 10 ? `0${value.month}` : `${value.month}`}-${value.day}`)
            toast.success("Fecha válida, continue con el proceso");
        }
    };
    let formatter = useDateFormatter({ dateStyle: "full" });

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 p-6">
            <div className="w-full flex flex-col gap-y-2">
                <DateInput
                    label="Fecha de nacimiento"
                    value={value}
                    onChange={setValue}
                />
                <button
                    onClick={handleValidation}
                    className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                    Validar
                </button>
            </div>
        </div>
    );
}
