'use client'
import { useStepsForm } from '@/src/hooks/useStepForm'
import { AdminFormDataProperty, AdminProperty, AdminPropertyById } from '@/src/types/adminTypes/adminProperty'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import TabsForm from '../ui/TabsForms'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { adminEditProperty } from '@/src/services/client/properties/admin/adminEditProperty'
import { uploadAndFormatImages } from '@/src/utils/frontend/images/uploadImages'

type EditPropertyFormProps = {
    dataProperty: AdminPropertyById,
    id: AdminProperty['id']
}

export default function EditPropertyForm({ dataProperty, id }: EditPropertyFormProps) {
    useEffect(() => dataProperty && setExistData(dataProperty), [])

    const { methods, handleSubmit, getValues, currentStep, setCurrentStep, validatedSteps, goToNextStep, goToStep, completeForm, renderStep, setExistData } = useStepsForm()

    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: adminEditProperty,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            router.push('/dashboard/properties')
        }
    })

    const onSubmit = async (data: AdminFormDataProperty) => {
        const updatedImages = await uploadAndFormatImages(data);
        const updatedPropertyData = { ...data, ...updatedImages };
        mutate({ id, data: updatedPropertyData });
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