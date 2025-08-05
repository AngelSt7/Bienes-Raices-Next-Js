'use client'
import { useEffect, useState } from "react";
import { DateValue } from "@internationalized/date";
import { DateInput } from "@heroui/react";
import { useForm } from 'react-hook-form';
import Input from '../../ui/inputs/Input';
import { AuthCompleteAccount } from '@/src/types/authTypes/auth';
import { AiOutlineUser } from 'react-icons/ai';
import { Phone } from 'lucide-react';
import { User } from '@/src/types/userTypes/user';
import ErrorsAuth from "../../ui/errors/ErrorsAuth";
import { useMutation } from "@tanstack/react-query";
import { authCompleteAccount } from "@/src/services/server/auth-actions/authCompleteAccount-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type DataAccountFormProps = { user: User }

export default function CompleteAccountForm({ user }: DataAccountFormProps) {
    const router = useRouter();
    const today = new Date();
    const defaultBirthDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const [birthDate, setBirthDate] = useState<DateValue | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AuthCompleteAccount>({
        defaultValues: {
            name: user.name,
            lastname: user.lastname,
            birthDate: defaultBirthDate
        }
    });

    const { mutate } = useMutation({
        mutationFn: authCompleteAccount,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            router.replace('/dashboard/properties?page=1');
        }
    })

    useEffect(() => {
        if (birthDate) {
            const formattedDate = `${birthDate.year}-${String(birthDate.month).padStart(2, '0')}-${String(birthDate.day).padStart(2, '0')}`;
            setValue('birthDate', formattedDate, { shouldValidate: true });
        }
    }, [birthDate, setValue]);

    const onSubmit = (data : AuthCompleteAccount) => mutate(data)
    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 p-6 shadow-md">
                <div className='flex gap-3 flex-1'>
                    <Input
                        type="text"
                        label="Nombre"
                        placeholder='Ingresa tu nombre'
                        register={register("name", { required: "El nombre es obligatorio" })}
                        errorMessage={errors.name}
                        Icon={AiOutlineUser}
                    />
                    <AiOutlineUser className='text-red-500' />
                    <Input
                        type="text"
                        label="Apellido"
                        placeholder='Ingresa tu apellido'
                        register={register("lastname", { required: "El apellido es obligatorio" })}
                        errorMessage={errors.lastname}
                        Icon={AiOutlineUser}
                    />
                </div>

                <Input
                    type="tel"
                    label="Teléfono"
                    placeholder='Ingresa tu teléfono'
                    register={register("phone", {
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^\d{9}$/,
                            message: "El teléfono debe tener exactamente 9 dígitos numéricos"
                        }
                    })}
                    errorMessage={errors.phone}
                    Icon={Phone}
                />

                <label className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
                    Fecha de nacimiento
                </label>
                <DateInput
                    labelPlacement="outside"
                    value={birthDate}
                    onChange={setBirthDate}
                />

                <input
                    type="hidden"
                    {...register('birthDate', {
                        required: 'La fecha es obligatoria',
                        validate: (value) => {
                            const birthDate = new Date(value);
                            const today = new Date();
                            const age = today.getFullYear() - birthDate.getFullYear();
                            const monthDiff = today.getMonth() - birthDate.getMonth();
                            const dayDiff = today.getDate() - birthDate.getDate();

                            if (birthDate > today) return "La fecha no puede ser futura";
                            if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
                                return "Debes tener al menos 18 años";
                            }
                            return true;
                        }
                    })}
                />
                {errors.birthDate && <ErrorsAuth>{errors.birthDate?.message?.toString()}</ErrorsAuth>}

                <button
                    className="mt-4 bg-zinc-800 text-white font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                    Completar mi Cuenta
                </button>
            </form>
        </div>
    );
}
