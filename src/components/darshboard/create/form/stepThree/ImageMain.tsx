'use client'
import { UseFormSetValue, FieldError, UseFormWatch, UseFormRegister } from 'react-hook-form'
import { TbPhotoPlus, TbTrash } from 'react-icons/tb'
import { AdminFormDataProperty } from '@/src/types/adminTypes/adminProperty'
import { ChangeEvent, useState, useEffect } from 'react'
import Image from 'next/image'
import ErrorsAuth from '@/src/components/ui/errors/ErrorsAuth'

type ImageMainProps = {
    setValue: UseFormSetValue<AdminFormDataProperty>
    errorMessage?: FieldError
    watch: UseFormWatch<AdminFormDataProperty>
    register: UseFormRegister<AdminFormDataProperty>
}

export default function ImageMain({ setValue, errorMessage, watch, register }: ImageMainProps) {
    const watchedImage = watch("imageMain")

    const [mainImage, setMainImage] = useState<File | null>(null)
    const [mainImageUrl, setMainImageUrl] = useState<string>('')

    useEffect(() => {
        if (watchedImage instanceof File) {
            setMainImage(watchedImage)
            setMainImageUrl(URL.createObjectURL(watchedImage))
        } else if (typeof watchedImage === 'string' && watchedImage) {
            setMainImage(null)
            setMainImageUrl(watchedImage)
        } else {
            setMainImage(null)
            setMainImageUrl('')
        }
    }, [watchedImage])

    const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setMainImage(file)
            setMainImageUrl(URL.createObjectURL(file))
            setValue("imageMain", file, { shouldValidate: true })
        }
    }

    const removeMainImage = () => {
        setMainImage(null)
        setMainImageUrl('')
        setValue("imageMain", '', { shouldValidate: true })
    }

    return (
        <div className="flex flex-col gap-4">
            <label className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
                Imagen principal (máximo una imagen)
            </label>

            <div className="relative cursor-pointer p-5 flex flex-col justify-center items-center gap-2 rounded-xl border-2 border-dashed border-zinc-400 dark:border-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group shadow-sm transition-all duration-300">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleMainImageChange}
                />
                <TbPhotoPlus
                    size={40}
                    className="text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    Subir imagen principal
                </p>
            </div>

            {mainImageUrl && (
                <div className="relative mt-3 transition-all duration-300">
                    <div className="overflow-hidden rounded-md flex justify-center items-center">
                        <div className="relative group w-fit">
                            <Image
                                src={mainImageUrl}
                                alt="Imagen principal"
                                width={250}
                                height={250}
                                className="rounded-md mx-auto object-cover transition-all duration-300 group-hover:brightness-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    type="button"
                                    onClick={removeMainImage}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                                >
                                    <TbTrash size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <input
                type="hidden"
                {...register("imageMain", {
                    validate: value => (value ? true : "Debes subir al menos una imagen")
                })}
            />
            {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    )
}
