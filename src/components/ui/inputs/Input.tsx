import { useMemo } from 'react'
import { FieldError, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import ErrorsAuth from '../errors/ErrorsAuth'
import { IconType } from 'react-icons'
import { usePathname } from 'next/navigation'
import { AdminFormDataProperty } from '@/src/types/adminTypes/adminProperty'

type InputProps<T extends FieldValues> = {
    type: string
    placeholder: string
    htmlFor?: string
    label?: string
    register?: ReturnType<UseFormRegister<T>>
    errorMessage?: FieldError
    Icon?: IconType
    setValue?: UseFormSetValue<AdminFormDataProperty>
    variant?: 'default' | 'floating'
}

export default function Input<T extends FieldValues>({
    type,
    label,
    register,
    htmlFor,
    errorMessage,
    placeholder,
    Icon,
    variant = 'default'
}: InputProps<T>) {
    const path = usePathname()
    const isAuth = path.includes('auth')

    const inputClasses = useMemo(() => {
        const baseClasses = `block w-full text-sm ${!isAuth && 'h-12'} p-2 bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-xl outline-none focus:ring-1 focus:ring-white/10 ${errorMessage ? 'ring-1 ring-[#d10b30]' : ''}`

        return variant === 'floating'
            ? `${baseClasses} peer px-3 pt-6 pb-2`
            : `${baseClasses} px-3 py-2.5 pr-10`
    }, [isAuth, errorMessage, variant])

    const autoCompleteValue = useMemo(() => type === "password" ? "new-password" : "off", [type])

    return (
        <div className="flex flex-col w-full gap-2">
            {variant === 'default' && label && (
                <label
                    htmlFor={`input-${label ? label : htmlFor}`}
                    className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={`input-${label ? label : htmlFor}`}
                    type={type}
                    placeholder={variant === 'floating' ? ' ' : placeholder}
                    autoComplete={autoCompleteValue}
                    className={inputClasses}
                    {...register}
                />
                {variant === 'floating' && (
                    <label
                        htmlFor={`input-${label ? label : htmlFor}`}
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform top-4 -translate-y-4 z-10 origin-[0] left-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:top-4 peer-focus:-translate-y-4"
                    >
                        {placeholder}
                    </label>
                )}
                {Icon && <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />}
            </div>
            {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    )
}