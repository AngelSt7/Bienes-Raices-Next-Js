'use client'
import { useRouter } from 'next/navigation';

import { PropertyAdmin } from '@/src/services';
import { FormDataProperty } from '@/src/types';
import { useMutation } from '@tanstack/react-query';
import { useStepsForm } from '@/src/hooks/form';
import { cloudinaryUploadImages } from '@/src/services/cloudinary/cloudinaryUploadImages';

import { FormProvider, SubmitHandler } from 'react-hook-form';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import { TabsForms } from '@/src/components';
import toast from 'react-hot-toast';

export default function CreateProperty() {
    const router = useRouter()
    const { methods, handleSubmit, getValues, currentStep, setCurrentStep, validatedSteps, goToNextStep, goToStep, completeForm, renderStep } = useStepsForm()

    const { mutate } = useMutation({
        mutationFn: PropertyAdmin.create,
        onError: (error) => {
            toast.error(error.message || 'Ocurrio un error en el servidor')
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const onSubmit: SubmitHandler<FormDataProperty> = async (data) => {
        const uploadResult = await cloudinaryUploadImages({ imageMain: data.imageMain, imagesGallery: data.imagesGallery });
        const formattedData = { ...data, imageMain: uploadResult.imageMainUrl, imagesGallery: uploadResult.galleryUrls };
        mutate(formattedData);
        router.replace('/dashboard/properties')
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
                <TabsForms
                    currentStep={currentStep}
                    goToStep={goToStep}
                    validatedSteps={validatedSteps}
                    getValues={getValues}
                />

                 {renderStep()} 

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                        className={`flex items-center font-bold text-white pr-2 py-2 rounded bg-blue-900 hover:bg-blue-950 hover:scale-105 transition-transform ${currentStep === 1 ? 'invisible' : ''}`}
                    >
                        <MdNavigateBefore className='text-white font-bold text-2xl' />
                        Anterior
                    </button>
                    <button
                        type="button"
                        onClick={goToNextStep}
                        className={`flex items-center font-bold text-white pl-2 py-2 rounded transition-transform bg-blue-900 hover:bg-blue-950 hover:scale-105 ${currentStep === 4 ? 'invisible' : ''}`}
                    >
                        Siguiente <MdNavigateNext className='text-white font-bold text-2xl' />
                    </button>
                </div>
                {completeForm ? (
                    <button
                        type="submit"
                        className="bg-blue-900 w-full transition-colors font-semibold text-lg text-white px-4 py-2 rounded mt-4 hover:bg-blue-950"
                    >
                        Crear Propiedad
                    </button>
                ) : ''}
            </form>
        </FormProvider>
    )
}
