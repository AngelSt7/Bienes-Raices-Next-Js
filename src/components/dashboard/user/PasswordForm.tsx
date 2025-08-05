'use client'
import { User, UserUpdatePassword } from "@/src/types/userTypes/user";
import Input from "../../ui/inputs/Input";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Key, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userUpdatePassword } from "@/src/services/client/user/UserUpdatePassword";

type UserFormProps = { user: User }

export default function PasswordForm({ user }: UserFormProps) {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<UserUpdatePassword>();

    const { mutate } = useMutation({
        mutationFn: userUpdatePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            reset()
            toast.success(data)
        }
    })

    const onSubmit = (data: UserUpdatePassword) => mutate(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <Input
                htmlFor="currentPassword"
                variant="floating"
                placeholder="Tu contraseña actual"
                type="password"
                register={register("currentPassword", {
                    required: "La contraseña es obligatoria", minLength: {
                        value: 6,
                        message: "La contraseña debe tener mínimo 6 caracteres"
                    }
                })}
                errorMessage={errors.password}
                Icon={Key}
            />
            <Input
                htmlFor="password"
                variant="floating"
                placeholder="Nueva contraseña"
                type="password"
                register={register("password", {
                    required: "La contraseña es obligatoria", minLength: {
                        value: 6,
                        message: "La contraseña debe tener mínimo 6 caracteres"
                    }
                })}
                errorMessage={errors.password}
                Icon={Key}
            />

            <Input
                htmlFor="repeatPassword"
                variant="floating"
                placeholder="Repite tu contraseña"
                type="password"
                register={register("repeatPassword", {
                    required: "Debes confirmar la contraseña",
                    validate: (value) =>
                        value === getValues("password") || "Las contraseñas no coinciden"
                })}
                errorMessage={errors.repeatPassword}
                Icon={Key}
            />
            <div className="flex gap-2 justify-end">
                <Button type="submit" fullWidth color="warning" variant="flat">
                    Actualizar crendeciales
                </Button>
            </div>
        </form>
    );
}
