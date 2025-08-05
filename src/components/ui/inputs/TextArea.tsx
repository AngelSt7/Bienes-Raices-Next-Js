import React, { useEffect } from 'react'
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import ErrorsAuth from '../errors/ErrorsAuth'
import { usePathname } from 'next/navigation'
import { AdminFormDataProperty } from '@/src/types/adminTypes/property'

type TextAreaProps<T extends FieldValues> = {
    label?: string
    register?: ReturnType<UseFormRegister<T>>
    errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    placeholder: string
    rows?: number,
    setValue?: UseFormSetValue<AdminFormDataProperty>
    defaultData?: string | number,
    name?: keyof AdminFormDataProperty;
}

export default function TextArea<T extends FieldValues>({
    label,
    register,
    errorMessage,
    placeholder,
    setValue,
    defaultData,
    name,
    rows = 4
}: TextAreaProps<T>) {
    const path = usePathname()
    const isAuth = path.includes('auth')

    useEffect(() => {
        if (name && defaultData && setValue) {
            setValue(name, defaultData, { shouldValidate: true })
        }
    }, [setValue, defaultData])

    return (
        <div className="flex flex-col w-full gap-2">
            {label && (
                <label
                    htmlFor={`textarea-${label}`}
                    className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <textarea
                    id={`textarea-${label}`}
                    placeholder={placeholder}
                    rows={rows}
                    className={`block w-full text-sm ${!isAuth && 'h-auto'} p-2 bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] 
                        rounded-lg px-3 py-2.5 outline-none focus:ring-1 focus:ring-white/10 resize-none
                        ${errorMessage ? 'ring-1 ring-[#d10b30]' : ''}`}
                    {...register}
                />
            </div>
            {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    )
}
