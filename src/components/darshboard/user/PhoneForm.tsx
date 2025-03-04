'use client'
import { User, UserUpdatePhone } from "@/src/types/userTypes/user";
import Input from "../../ui/inputs/Input";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userUpdatePhone } from "@/src/services/client/user/UserUpdatePhone";
import toast from "react-hot-toast";

type UserFormProps = { user: User }

export default function PhoneForm({ user }: UserFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserUpdatePhone>({
        defaultValues: {
            phone: user.phone
        }
    });

    const {mutate} = useMutation({
        mutationFn: userUpdatePhone,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const onSubmit = (data: UserUpdatePhone) => mutate(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4 ">
            <Input
                label="Teléfono"
                variant="floating"
                placeholder="Tu teléfono"
                type="tel"
                register={register('phone', {
                    valueAsNumber: true,
                    required: "Este campo es obligatorio",
                    min: { value: 900000000, message: "El número debe tener 9 dígitos" },
                    max: { value: 999999999, message: "El número debe tener 9 dígitos" },
                })}
                errorMessage={errors.phone}
            />
            <div className="flex gap-2 justify-end">
                <Button type="submit" fullWidth color="warning" variant="flat">
                    Actualizar Teléfono
                </Button>
            </div>
        </form>
    )
}
