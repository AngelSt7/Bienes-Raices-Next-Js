import React from 'react'
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form'
import ErrorsAuth from '../errors/ErrorsAuth'

type InputProps<T extends FieldValues> = {
    type: string
    label: string
    register: ReturnType<UseFormRegister<T>>
    errorMessage: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}
export default function InputAuth<T extends FieldValues>({ type, label, register, errorMessage }: InputProps<T>) {

    return (
        <div className="relative">
            <input
                id={`floating-${label}`}
                type={type}
                autoComplete={type === "password" ? "new-password" : "off"} // ✅ Previene autocompletado
                className={` peer w-full text-sm bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#27272a] dark:hover:bg-[#3f3f46] rounded-lg px-2 pt-6 pb-2 outline-none transition-all ${errorMessage && 'bg-[#fee7ef] hover:bg-[#fdd3e1] dark:bg-[#310413] dark:hover:bg-[#610726]'}`}
                placeholder=""
                {...register}
            />
            <label
                htmlFor={`floating-${label}`}
                className={`absolute text-sm text-[#4e4e4e] dark:text-[#9a9aa3] transition-all duration-200 transform
    left-2 top-4 origin-left cursor-text select-none
    peer-focus:text-xs peer-focus:-translate-y-3 
    peer-focus:dark:text-[#cfcfd3]
    peer-[:not(:placeholder-shown)]:text-xs 
    peer-[:not(:placeholder-shown)]:-translate-y-3
    peer-[:not(:placeholder-shown)]:dark:text-[#cfcfd3]
    ${errorMessage && 'text-[#f31260] dark:text-[#d10b30] peer-focus:text-[#f31260] peer-focus:dark:text-[#d10b30] peer-[:not(:placeholder-shown)]:text-[#f31260] peer-[:not(:placeholder-shown)]:dark:text-[#d10b30]'}`}
            >
                {label}
            </label>
            {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    )
}
