'use client'

import { useForm } from 'react-hook-form';
import Input from '../../ui/inputs/Input';
import { AuthCreateAccount } from '@/src/types/authTypes/auth';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { authCreateAccount } from '@/src/services/server/auth-actions/authCreateAccount-action';
import { useEffect } from 'react';
import { Phone } from 'lucide-react';

type DataAccountFormProps = {
    birthDate: string
}

export default function DataAccountForm({ birthDate }: DataAccountFormProps) {
    const { register, handleSubmit, formState: { errors }, getValues, reset, watch } = useForm<AuthCreateAccount>({
        defaultValues: {
            birthDate: birthDate
        }
    });

    const { mutate } = useMutation({
        mutationFn: authCreateAccount,
        onError: (error) => {
            toast.error(error.message || "Ocurrió un error");
        },
        onSuccess: (data) => {
            reset()
            toast.success(data);
            redirect('/auth/login')
        }
    })

    const onSubmit = (data: AuthCreateAccount) => mutate(data)

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="  flex w-full flex-col gap-4 p-6 shadow-md">

                <div className='flex gap-3 flex-1'>
                    <Input
                        type="text"
                        label="Nombre"
                        placeholder='Ingresa tu nombre'
                        register={register("name", { required: "El nombre es obligatorio" })}
                        errorMessage={errors.name}
                        Icon={AiOutlineUser}
                    />
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
                    placeholder='Ingresa tu apellido'
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

                <Input
                    type="email"
                    label="Email"
                    placeholder='Ingresa tu email'
                    register={register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El email no es válido"
                        }
                    })}
                    errorMessage={errors.email}
                    Icon={AiOutlineMail}
                />

                <Input
                    type="password"
                    label="Contraseña"
                    placeholder='Ingresa tu contraseña'
                    register={register("password", {
                        required: "La contraseña es obligatoria", minLength: {
                            value: 6,
                            message: "La contraseña debe tener mínimo 6 caracteres"
                        }
                    })}
                    errorMessage={errors.password}
                    Icon={AiOutlineLock}
                />

                <Input
                    type="password"
                    label="Repetir contraseña"
                    placeholder='Repite tu contraseña'
                    register={register("repeatPassword", {
                        required: "Debes confirmar la contraseña",
                        validate: (value) =>
                            value === getValues("password") || "Las contraseñas no coinciden"
                    })}
                    errorMessage={errors.repeatPassword}
                    Icon={AiOutlineLock}
                />

                <button
                    className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
    )
}
