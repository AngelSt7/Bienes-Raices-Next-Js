import { AuthToken, AuthUpdatePassword } from '@/src/types/authTypes'
import Input from '../../ui/inputs/Input'
import { useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';

type NewPasswordProps = {
    token: AuthToken['token']
}

export default function NewPassword({ token }: NewPasswordProps) {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<AuthUpdatePassword>();

    const onSubmit = (data: AuthUpdatePassword) => {
        console.log(data)
    }

    return (
        <div>
            <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Actualiza tu contraseña y recupera tu acceso a tu cuenta</h2>

            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="  flex w-full flex-col gap-4 p-6 shadow-md">

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
                    Actualizar contraseña
                </button>
            </form>
        </div>
    )
}
