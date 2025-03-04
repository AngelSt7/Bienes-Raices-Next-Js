'use client'
import { useForm } from 'react-hook-form';
import { Mail, Phone, User } from 'lucide-react';
import Input from '../../ui/inputs/Input';
import TextArea from '../../ui/inputs/TextArea';
import { BiLogoGmail } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { PublicContactForm, PublicPropertyById } from '@/src/types/publicTypes/publicProperty';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { publicSendEmail } from '@/src/services/client/properties/public/publicSendEmail';
import toast from 'react-hot-toast';

type FormContactProps = {
    direction: string,
    phoneUser: PublicPropertyById['user']['phone']
}

export default function FormContact({ direction, phoneUser }: FormContactProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<PublicContactForm, 'direction'>>();

    const {mutate} = useMutation({
        mutationFn: publicSendEmail,
        onError: (error)=> { toast.error(error.message) },
        onSuccess: (data) => { reset(), toast.success(data) }
    })

    const message = `Hola, me interesa la propiedad ubicada en ${direction}, estará disponible aún?`
    const preparedMessage = encodeURIComponent(message);
    const messageFormated = `https://wa.me/51${phoneUser}?text=${preparedMessage}`

    const onSubmit = async (data : Omit<PublicContactForm, 'direction'>) => {
        const directionProperty = direction
        mutate({...data, direction: directionProperty})
    }

    return (
        <div className=' bg-[#f1f1f1] p-3 dark:bg-[#181818] border border-[#C8C8C8] dark:border-[#343434] rounded-lg'>
            <fieldset className=' font-bold text-zinc-800 dark:text-gray-100 mb-3'>Contacta al vendedor</fieldset>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='  flex flex-col gap-3 mb-4'>
                    <Input
                        variant="floating"
                        htmlFor="email"
                        type="email"
                        placeholder="Tu email"
                        Icon={Mail}
                        errorMessage={errors.email}
                        register={register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Ingrese un email válido",
                            },
                        })}
                    />

                    <Input
                        variant="floating"
                        htmlFor="tel"
                        type="tel"
                        placeholder="Tu teléfono"
                        Icon={Phone}
                        errorMessage={errors.phone}
                        register={register("phone", {
                            required: "El teléfono es obligatorio",
                            pattern: {
                                value: /^[0-9]{9}$/,
                                message: "Ingrese un número de 9 dígitos",
                            },
                        })}
                    />

                    <div className="flex w-full gap-2">
                        <Input
                            variant="floating"
                            htmlFor="name"
                            type="text"
                            placeholder="Tu nombre"
                            Icon={User}
                            errorMessage={errors.name}
                            register={register("name", {
                                required: "El nombre es obligatorio",
                            })}
                        />
                        <Input
                            variant="floating"
                            htmlFor="lastname"
                            type="text"
                            placeholder="Tu apellido"
                            Icon={User}
                            errorMessage={errors.lastname}
                            register={register("lastname", {
                                required: "El apellido es obligatorio",
                            })}
                        />
                    </div>

                    <TextArea
                        label="Tu mensaje"
                        errorMessage={errors.message}
                        placeholder="Ej: Hola buenos días, requiero información extra sobre la propiedad"
                        register={register("message", {
                            required: "El mensaje es obligatorio",
                        })}
                    />

                </div>
                <button type='submit' className="flex items-center justify-center gap-3 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-full mb-3">
                    Contactar por Email
                    <BiLogoGmail className="text-white text-xl" />
                </button>
            </form>

            <Link
                href={messageFormated}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-full"
            >
                Escribir directamente
                <ImWhatsapp className="text-white text-xl" />
            </Link>

        </div>
    )
}
