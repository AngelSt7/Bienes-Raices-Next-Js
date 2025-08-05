'use client'
import { User, UserUpdateEmail } from "@/src/types/userTypes/user";
import Input from "../../ui/inputs/Input";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userUpdateEmail } from "@/src/services/client/user/UserUpdateEmail";
import { signOut } from "next-auth/react";

type UserFormProps = { user: User }

export default function EmailForm({ user }: UserFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserUpdateEmail>({
        defaultValues: {
            email: user.email
        }
    });

    const { mutate } = useMutation({
        mutationFn: userUpdateEmail,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            signOut({ callbackUrl: "/auth/login" }); 
        }
    });

    const onSubmit = (data: UserUpdateEmail) => mutate(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <Input
                htmlFor='email'
                type="email"
                variant="floating"
                placeholder='Ingresa tu email'
                register={register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "El email no es válido"
                    }
                })}
                errorMessage={errors.email}
                Icon={Mail}
            />
            <div className="flex gap-2 justify-end">
                <Button type="submit" fullWidth color="warning" variant="flat">
                    Actualizar Email
                </Button>
            </div>
        </form>
    );
}
