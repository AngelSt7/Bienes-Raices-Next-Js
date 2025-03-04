'use client'

import Input from "../../ui/inputs/Input"
import { User, Mail, Phone } from 'lucide-react';
import TextArea from "../../ui/inputs/TextArea";
import { useForm } from 'react-hook-form';
import { PublicContactForm } from "@/src/types/publicTypes/publicProperty";

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<PublicContactForm>();

    const onSubmit = (data: PublicContactForm) => {
        console.log(data)
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className=" grid grid-cols-2 w-full gap-x-4">
                <Input type="text" placeholder='Nombre' variant="floating" Icon={User}
                    register={register('name', {
                        required: 'El nombre es obligatorio'
                    })}
                    errorMessage={errors.name}
                />
                <Input type="text" placeholder='Apellido' variant="floating" Icon={User}
                    register={register('lastname', {
                        required: 'El apellido es obligatorio'
                    })}
                    errorMessage={errors.lastname}
                />
            </div>
            <Input type="text" placeholder='Asunto' variant="floating" Icon={Mail}
                register={register('subject', {
                    required: 'El asunto es obligatorio'
                })}
                errorMessage={errors.subject}
            />
            <Input type="email" placeholder='Email' variant="floating" Icon={Mail}
                register={register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Ingrese un email válido'
                    }
                })}
                errorMessage={errors.email}
            />
            <Input type="number" placeholder='Telefono' variant="floating" Icon={Phone}
                register={register('phone', {
                    valueAsNumber: true,
                    required: 'El telefono es obligatorio'
                })}
                errorMessage={errors.phone}
            />
            <TextArea placeholder="Tu mensaje. Ej: Tengo un inconveniente con..."
                register={register('message', {
                    required: 'El mensaje es requerido'
                })}
                errorMessage={errors.message}
            />
            <button className="w-full bg-zinc-900/90 hover:bg-zinc-800 dark:bg-zinc-700/25 dark:hover:bg-zinc-800 text-gray-100 mt-4 mx-auto px-4 py-2 transition-transform-background rounded-md font-medium">Enviar</button>
        </form>
    )
}
