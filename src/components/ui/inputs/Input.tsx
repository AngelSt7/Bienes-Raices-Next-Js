import React, { useMemo } from 'react'
import { FieldError, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import ErrorsAuth from '../errors/ErrorsAuth'
import { IconType } from 'react-icons'
import { usePathname } from 'next/navigation'
import { AdminFormDataProperty } from '@/src/types/adminTypes/adminProperty'

type InputProps<T extends FieldValues> = {
    type: string
    label: string
    register?: ReturnType<UseFormRegister<T>>
    errorMessage?: FieldError
    placeholder: string
    Icon?: IconType
    setValue?: UseFormSetValue<AdminFormDataProperty>
}

export default function Input<T extends FieldValues>({
    type,
    label,
    register,
    errorMessage,
    placeholder,
    Icon
}: InputProps<T>) {
    const path = usePathname()
    const isAuth = path.includes('auth')

    const inputClasses = useMemo(() => {
        return `block w-full text-sm ${!isAuth && 'h-12'} p-2 bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[##3f3f46] rounded-xl px-3 py-2.5 outline-none pr-10 focus:ring-1 focus:ring-white/10 ${errorMessage ? 'ring-1 ring-[#d10b30]' : ''}`
    }, [isAuth, errorMessage])

    const autoCompleteValue = useMemo(() => type === "password" ? "new-password" : "off", [type])

    return (
        <div className="flex flex-col w-full gap-2">
            <label
                htmlFor={`input-${label}`}
                className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={`input-${label}`}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoCompleteValue}
                    className={inputClasses}
                    {...register}
                />
                {Icon && <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />}
            </div>
            {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    )
}
