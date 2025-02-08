import { AuthToken, AuthUpdatePassword } from '@/src/types/authTypes'
import Input from '../../ui/inputs/Input'
import { useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import { authUpdatePassword } from '@/src/services/server-actions/auth-actions/authUpdatePassword-action';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

type NewPasswordProps = {
    token: AuthToken['token']
}

export default function NewPassword({ token }: NewPasswordProps) {

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<AuthUpdatePassword>();

    const {mutate} = useMutation({
        mutationFn: authUpdatePassword,
        onError: (error) => {
            toast.error(error.message || "Ocurrió un error");
        },
        onSuccess: (data) => {
            reset()
            toast.success(data);
            redirect('/auth/login')
        }
    })

    const onSubmit = (data: AuthUpdatePassword) => mutate({password: data.password, token}) 

    return (
        <div>
            <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Actualiza tu contraseña y recupera tu acceso a tu cuenta</h2>

            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="  flex w-full flex-col gap-4 p-6 shadow-md">

                <Input
                    type="password"
                    label="Contraseña"
                    placeholder='Ingresa tu contraseña'
                    register={register("password", { required: "La contraseña es obligatoria" , minLength: {
                        value: 6,
                        message: "La contraseña debe tener mínimo 6 caracteres"
                    }})}
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
                    Actualizar contraseña
                </button>
            </form>
        </div>
    )
}
