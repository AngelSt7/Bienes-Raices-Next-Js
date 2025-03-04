import { useForm } from "react-hook-form";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { isFormComplete } from "../utils/frontend/form/formUtils";
import Loading from "../components/ui/charge/Loading";
import { AdminFormDataProperty, AdminPropertyById } from "../types/adminTypes/adminProperty";
import { usePathname } from "next/navigation";
const StepOne = lazy(() => import("../components/darshboard/create/form/stepOne/StepOne"));
const StepTwo = lazy(() => import("../components/darshboard/create/form/stepTwo/StepTwo"));
const StepThree = lazy(() => import("../components/darshboard/create/form/stepThree/StepThree"));
const StepFour = lazy(() => import("../components/darshboard/create/form/stepFour/StepFour"));


export const useStepsForm = () => {
    
    const pathname = usePathname();
    const isEditing = pathname.includes("edit"); 
    const [existData, setExistData] = useState<AdminPropertyById>({} as AdminPropertyById);

    useEffect(() => {
        if (isEditing && Object.keys(existData).length > 0) {
            methods.reset(existData);
        }
    }, [existData]);
    
    const methods = useForm<AdminFormDataProperty>({ 
        mode: 'onChange',
        defaultValues: isEditing ? {
            ...existData
        } : undefined
    });
    const { handleSubmit, register, trigger, setError, formState, setValue, getValues, watch, clearErrors } = methods;
    const [currentStep, setCurrentStep] = useState(1);
    const [validatedSteps, setValidatedSteps] = useState<number[]>([]);

    const validateCurrentStep = async (): Promise<boolean> => {
        if (currentStep === 1) return await trigger(['districtId', 'location', 'area', 'yearBuilt']);
        if (currentStep === 2) return await trigger(['typeId', 'bedrooms', 'bathrooms', 'parkingSpaces', 'furnished', 'terrace', 'elevator', 'services']);
        if (currentStep === 3) return await trigger(['imageMain', 'imagesGallery', 'description']);
        if (currentStep === 4) return await trigger(['price', 'currencyId']);
        return false;
    };

    const goToNextStep = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            setValidatedSteps((prev) => [...new Set([...prev, currentStep])]);
            setCurrentStep((prev) => Math.min(prev + 1, 4));
        }
    };

    const goToStep = async (step: number) => {
        const values = getValues();
        const isValid = step > currentStep ? await validateCurrentStep() : true;
        const isStep1Valid = values.districtId && values.location && values.area && values.yearBuilt;
        const isStep2Valid =
            values.typeId &&
            values.bedrooms &&
            values.bathrooms &&
            values.parkingSpaces !== undefined &&
            values.terrace !== undefined &&
            values.furnished !== undefined &&
            values.elevator !== undefined &&
            Array.isArray(values.services) && values.services.length > 0;

        const isStep3Valid =
            values.imageMain &&
            Array.isArray(values.imagesGallery) && values.imagesGallery.length > 0 &&
            values.description;

        const isStep4Valid = values.price && values.currencyId;

        const canProceed =
            (step === 1) ||
            (step === 2 && isStep1Valid) ||
            (step === 3 && isStep1Valid && isStep2Valid) ||
            (step === 4 && isStep1Valid && isStep2Valid && isStep3Valid);

        if ((canProceed && isValid) || step < currentStep) {
            setValidatedSteps((prev) => [...new Set([...prev, currentStep])]);
            setCurrentStep(step);
        }
    };

    const formValues = watch();
    const completeForm = isFormComplete(formValues);

    const renderStep = () => {
        const hasExistData = Object.keys(existData).length > 0;
    
        switch (currentStep) {
            case 1:
                return (
                    <StepOne
                        register={register}
                        errors={formState.errors}
                        setValue={setValue}
                        watch={watch}
                        {...(hasExistData && { dataProperty: existData })}
                    />
                );
            case 2:
                return (
                    <Suspense fallback={<Loading />}>
                        <StepTwo
                            register={register}
                            errors={formState.errors}
                            setValue={setValue}
                            watch={watch}
                            {...(hasExistData && { dataProperty: existData })}
                        />
                    </Suspense>
                );
            case 3:
                return (
                    <Suspense fallback={<Loading />}>
                        <StepThree
                            register={register}
                            errors={formState.errors}
                            setValue={setValue}
                            watch={watch}
                            {...(hasExistData && { dataProperty: existData })}
                        />
                    </Suspense>
                );
            case 4:
                return (
                    <Suspense fallback={<Loading />}>
                        <StepFour
                            register={register}
                            errors={formState.errors}
                            setValue={setValue}
                            watch={watch}
                            {...(hasExistData && { dataProperty: existData })}
                        />
                    </Suspense>
                );
            default:
                return null;
        }
    };
    

    return {
        methods,
        watch,
        handleSubmit,
        register,
        formState,
        setValue,
        getValues,
        clearErrors,
        currentStep,
        setCurrentStep,
        validatedSteps,
        goToNextStep,
        goToStep,
        completeForm,
        renderStep,
        formValues,
        setError,
        setExistData
    };
};
