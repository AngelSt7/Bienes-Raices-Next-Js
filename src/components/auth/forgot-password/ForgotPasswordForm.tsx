'use client'

import { useForm } from 'react-hook-form';
import Input from '../../ui/inputs/Input';
import { AuthForgotPassword } from '@/src/types/authTypes';
import { AiOutlineMail } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import { authForgotPassword } from '@/src/services/server-actions/auth-actions/authForgotPasswordAccount-action';
import toast from 'react-hot-toast';

export default function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthForgotPassword>();

    const { mutate } = useMutation({
        mutationFn: authForgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            reset()
            toast.success(data)
        }
    })

    const onSubmit = (data: AuthForgotPassword) => mutate(data)
    
    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="  flex w-full flex-col gap-4 p-6 shadow-md">

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

                <button
                    className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                   Solicitar Token
                </button>
            </form>
        </div>
    )
}
