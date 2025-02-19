'use client'

import { useStepsForm } from '@/src/hooks/useStepForm';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import TabsForm from '../ui/TabsForms';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminCreateProperty } from '@/src/services/client/properties/adminCreateProperty';
import { AdminFormDataProperty } from '@/src/types/adminTypes/adminProperty';
import { cloudinaryUploadImages } from '@/src/services/cloudinary/cloudinaryUploadImages';

export default function AddPropertyForm() {
    const router = useRouter()
    const { methods, handleSubmit, getValues, currentStep, setCurrentStep, validatedSteps, goToNextStep, goToStep, completeForm, renderStep } = useStepsForm()

    const { mutate } = useMutation({
        mutationFn: adminCreateProperty,
        onError: (error) => {
            toast.error(error.message || 'Ocurrio un error en el servidor')
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const onSubmit: SubmitHandler<AdminFormDataProperty> = async (data) => {
        const uploadResult = await cloudinaryUploadImages({ imageMain: data.imageMain, imagesGallery: data.imagesGallery });
        const formattedData = { ...data, imageMain: uploadResult.imageMainUrl, imagesGallery: uploadResult.galleryUrls };
        mutate(formattedData);
        router.replace('/dashboard/properties')
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
                <TabsForm
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
