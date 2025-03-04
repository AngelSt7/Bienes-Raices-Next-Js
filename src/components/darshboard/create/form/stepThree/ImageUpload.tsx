'use client'
import { FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TbPhotoPlus, TbTrash } from 'react-icons/tb';
import { AdminFormDataProperty } from '@/src/types/adminTypes/adminProperty';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { Merge } from '@heroui/react';
import ErrorsAuth from '@/src/components/ui/errors/ErrorsAuth';

type ImageType = {
  file: File;
  tempUrl: string;
};

type ImageUploadProps = {
  setValue: UseFormSetValue<AdminFormDataProperty>;
  register: UseFormRegister<AdminFormDataProperty>;
  errorMessage?: FieldError | Merge<FieldError, any> | undefined;
  watch: UseFormWatch<AdminFormDataProperty>;
};

export default function ImageUpload({ setValue, errorMessage, register, watch }: ImageUploadProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const wathImages = 

  useEffect(() => {
    const imagesFromForm = watch("imagesGallery") as (string | File)[] | undefined;
  
    if (!imagesFromForm) return;
  
    const parsedImages = imagesFromForm
      .filter((img): img is File => img instanceof File) // Solo archivos
      .map(file => ({
        file,
        tempUrl: URL.createObjectURL(file)
      }));
  
    setImages(parsedImages);
  }, [watch]); // Usamos `watch` como función, no `watch("images")`
  
  
  const [deletingImage, setDeletingImage] = useState<string | null>(null);

  useEffect(() => {
    // Actualizar react-hook-form cuando cambia el estado local
    setValue("imagesGallery", images.map(img => img.file), { shouldValidate: true });
  }, [images, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        file,
        tempUrl: URL.createObjectURL(file),
      }));

      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (imageToDelete: string) => {
    setDeletingImage(imageToDelete);
    setTimeout(() => {
      setImages(prevImages => prevImages.filter(img => img.tempUrl !== imageToDelete));
      setDeletingImage(null);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
        Fotos de la propiedad
      </label>

      {/* Botón de carga de imágenes */}
      <div className="relative cursor-pointer p-10 flex flex-col justify-center items-center gap-4 rounded-xl border-2 border-dashed border-zinc-400 dark:border-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group shadow-sm">
        <input
          type="file"
          accept="image/*"
          id="imageThumbnail"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
          multiple
        />
        <TbPhotoPlus size={50} className="text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-300 transition" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Agregar Imagen</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Formatos soportados: JPG, PNG, WebP</p>
      </div>

      <input
        type="hidden"
        {...register("imagesGallery", { validate: value => value.length > 0 || "Debes subir al menos una imagen" })}
      />
      {errorMessage && <ErrorsAuth>{errorMessage.message?.toString()}</ErrorsAuth>}

      {/* Mostrar imágenes cargadas */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 mt-5 gap-2">
          {images.map((image, index) => (
            <div key={image.tempUrl + index} className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                opacity: deletingImage === image.tempUrl ? 0 : 1,
                transition: 'all 0.3s ease-in-out',
                transform: deletingImage === image.tempUrl ? 'scale(0.8)' : 'scale(1)',
              }}
            >
              <Image src={image.tempUrl} alt="Imagen propiedad" width={250} height={250} className="rounded-md transition-all duration-300 group-hover:brightness-50 object-contain" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button type='button' onClick={() => handleDeleteImage(image.tempUrl)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                  <TbTrash size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
