'use client'

import { AdminProperty, AdminPropertyById, FormDataProperty } from '@/src/types/adminTypes/property'
import { FormProvider } from 'react-hook-form'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { PropertyAdmin } from '@/src/services'
import { TabsForms } from '@/src/components'
import { uploadAndFormatImages } from '@/src/utils/frontend/images/uploadImages'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useStepsForm } from '@/src/hooks'
import toast from 'react-hot-toast'

type EditPropertyFormProps = {
    dataProperty: AdminPropertyById,
    id: AdminProperty['id']
}

export default function EditProperty({ dataProperty, id }: EditPropertyFormProps) {
    useEffect(() => dataProperty && setExistData(dataProperty), [])

    const { methods, handleSubmit, getValues, currentStep, setCurrentStep, validatedSteps, goToNextStep, goToStep, completeForm, renderStep, setExistData } = useStepsForm()

    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: PropertyAdmin.edit,

        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            router.push('/dashboard/properties')
        }
    })

    const onSubmit = async (data: FormDataProperty) => {
        const updatedImages = await uploadAndFormatImages(data);
        const updatedPropertyData = { ...data, ...updatedImages };
        mutate(updatedPropertyData);
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