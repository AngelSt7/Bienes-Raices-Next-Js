'use client'

import { useForm } from 'react-hook-form';
import Input from '../../ui/inputs/Input';
import { AuthLogin } from '@/src/types/authTypes';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ButtonGoogle from './ButtonGoogle';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<AuthLogin>();
    const router = useRouter()

    const onSubmit = async (data: AuthLogin) => {
        const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        if (response?.error) {
            toast.error(response.error);
            return;
        }
        router.replace("/dashboard/create");
    };

    return (
        <div>
            <div className=' shadow-md p-6'>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="  flex w-full flex-col gap-4  ">
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

                    <button
                        className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <ButtonGoogle />
            </div>
        </div>
    )
}
