'use client'

import { useForm } from 'react-hook-form';
import Input from '../../ui/inputs/Input';
import { AuthCreateAccount } from '@/src/types/authTypes';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaPhoneAlt } from "react-icons/fa";

export default function CreateAccountForm() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<AuthCreateAccount>();

    const onSubmit = (data: AuthCreateAccount) => {
        console.log(data)
    }

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
                    type="number"
                    label="Edad"
                    placeholder='Ingresa tu edad'
                    register={register("age", {
                        required: "La edad es obligatoria y debe ser mayor a 18",
                        min: {
                            value: 18,
                            message: "Debes tener al menos 18 años"
                        },
                        max: {
                            value: 85,
                            message: "Maximo 85 años"
                        }
                    }
                    )}
                    errorMessage={errors.age}
                    Icon={AiOutlineUser}
                />

                <Input
                    type="number"
                    label="Teléfono"
                    placeholder="Ingresa tu número"
                    register={register("number", {
                        required: "El número es obligatorio",
                        maxLength: {
                            value: 9,
                            message: "Formato de número no válido"
                        },
                        minLength: {
                            value: 9,
                            message: "Formato de número no válido"
                        },
                    })}
                    errorMessage={errors.number}
                    Icon={FaPhoneAlt}
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
                    register={register("password", { required: "La contraseña es obligatoria" })}
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
