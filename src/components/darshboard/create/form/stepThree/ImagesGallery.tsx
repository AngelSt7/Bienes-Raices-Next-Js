'use client'
import { UseFormSetValue, FieldError, UseFormWatch, UseFormRegister } from 'react-hook-form'
import { TbPhotoPlus, TbTrash } from 'react-icons/tb'
import { AdminFormDataProperty } from '@/src/types/adminTypes/adminProperty'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import ErrorsAuth from '@/src/components/ui/errors/ErrorsAuth'

type ImagesGalleryProps = {
    setValue: UseFormSetValue<AdminFormDataProperty>
    errorMessage?: FieldError
    watch: UseFormWatch<AdminFormDataProperty>
    register: UseFormRegister<AdminFormDataProperty>
}

export default function ImagesGallery({ setValue, errorMessage, watch, register }: ImagesGalleryProps) {
    const watchedImages = watch("imagesGallery") || []
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

    const handleGalleryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const newImages = [...watchedImages, ...Array.from(files)]
            if (newImages.length > 10) {
                alert("Solo puedes subir hasta 10 imágenes.")
                return
            }
            setValue("imagesGallery", newImages, { shouldValidate: true })
        }
    }

    const removeGalleryImage = (index: number) => {
        setDeletingIndex(index)
        setTimeout(() => {
            const updatedImages = watchedImages.filter((_, i) => i !== index)
            setValue("imagesGallery", updatedImages, { shouldValidate: true })
            setDeletingIndex(null)
        }, 300)
    }

    return (
        <div className="flex flex-col gap-4">
            <label className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
                Imágenes secundarias (máximo 10 imágenes)
            </label>

            <div className="relative cursor-pointer p-5 flex flex-col justify-center items-center gap-2 rounded-xl border-2 border-dashed border-zinc-400 dark:border-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group shadow-sm transition-all duration-300">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleGalleryImagesChange}
                    multiple
                />
                <TbPhotoPlus 
                    size={40} 
                    className="text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" 
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    Subir imágenes para la galería
                </p>
            </div>

            {watchedImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 mt-3 gap-2">
                    {watchedImages.map((image, index) => {
                        const imageUrl = typeof image === "string" ? image : URL.createObjectURL(image)
                        return (
                            <div 
                                key={index} 
                                className="relative transition-all duration-300"
                                style={{
                                    opacity: deletingIndex === index ? 0 : 1,
                                    transform: deletingIndex === index ? 'scale(0.8)' : 'scale(1)',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                            >
                                <div className="overflow-hidden rounded-md">
                                    <div className="relative group inline-block">
                                        <Image 
                                            src={imageUrl} 
                                            alt={`Imagen ${index}`} 
                                            width={120} 
                                            height={120} 
                                            className="rounded-md object-cover transition-all duration-300 group-hover:brightness-50"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                                            >
                                                <TbTrash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <input
                type="hidden"
                {...register("imagesGallery", { 
                    validate: value => 
                        (value.length > 0 ? (value.length <= 10 ? true : "Máximo 10 imágenes permitidas") : "Debes subir al menos una imagen") 
                })}
            />
            {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}
        </div>
    )
}