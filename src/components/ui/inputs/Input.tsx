import React from 'react'
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form'
import ErrorsAuth from '../errors/ErrorsAuth'
import { IconType } from 'react-icons'

type InputProps<T extends FieldValues> = {
    type: string
    label: string
    register: ReturnType<UseFormRegister<T>>
    errorMessage: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    placeholder: string
    Icon?: IconType
}

export default function Input<T extends FieldValues>({ 
    type, 
    label, 
    register, 
    errorMessage, 
    placeholder, 
    Icon 
}: InputProps<T>) {
    return (
        <div className="flex flex-col w-full gap-2">
            <label 
                htmlFor={`input-${label}`}
                className="text-base font-semibold  text-[#202021] dark:text-[#c5c5c7]"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={`input-${label}`}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={type === "password" ? "new-password" : "off"}
                    className={`block w-full text-sm bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#303030] rounded-lg px-3 py-2.5 
                        outline-none transition-all pr-10
                        focus:ring-1 focus:ring-white/10
                        ${errorMessage ? 'ring-1 ring-[#d10b30]' : ''}`}
                    {...register}
                />
                {Icon && <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />}
            </div>
            {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    )
}
