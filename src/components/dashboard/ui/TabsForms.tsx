import React, { useMemo } from 'react';
import { FormDataProperty } from "@/src/types/adminTypes";
import { UseFormGetValues } from "react-hook-form";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";

type TabsFormProps = {
  currentStep: number;
  goToStep: (step: number) => void;
  validatedSteps: number[];
  getValues: UseFormGetValues<FormDataProperty>;
};

const TabsForm = ({ 
  currentStep, 
  goToStep, 
  validatedSteps, 
  getValues
}: TabsFormProps) => {
  const isStepAccessible = (step: number): boolean => {
    if (step === 2) return validatedSteps.includes(1);
    if (step === 3) return validatedSteps.includes(2);
    if (step === 4) return validatedSteps.includes(3);
    return true;
  };

  const getButtonClass = useMemo(() => (step: number) => {
    const baseClasses = "transition-all duration-200 rounded-full h-12 w-12 flex items-center justify-center relative";
    if (currentStep === step) {
      return `${baseClasses} border-2 bg-transparent border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600`;
    }
    if (isStepAccessible(step)) {
      return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900`;
    }
    return `${baseClasses} bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600`;
}, [currentStep, validatedSteps]);

const getConnectorClass = useMemo(() => (step: number) => {
    const baseClasses = "flex-1 h-1 mx-2";
    const isCompleted = validatedSteps.includes(step);
    return `${baseClasses} ${isCompleted ? 'bg-blue-600 dark:bg-blue-800' : 'bg-gray-200 dark:bg-gray-800'}`;
}, [validatedSteps]);


  const renderStepIcon = (step: number) => {
    const icons = {
      1: <RiNumber1 className="text-xl" />,
      2: <RiNumber2 className="text-xl" />,
      3: <RiNumber3 className="text-xl" />,
      4: <RiNumber4 className="text-xl" />
    };
    return icons[step as keyof typeof icons];
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 ">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step, index) => (
          <React.Fragment key={step}>
            <button
              type="button"
              onClick={() => isStepAccessible(step) && goToStep(step)}
              className={getButtonClass(step)}
              disabled={!isStepAccessible(step)}
              aria-current={currentStep === step ? 'step' : undefined}
            >
              {renderStepIcon(step)}
            </button>
            {index < 3 && (
              <div className={getConnectorClass(step)} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TabsForm;