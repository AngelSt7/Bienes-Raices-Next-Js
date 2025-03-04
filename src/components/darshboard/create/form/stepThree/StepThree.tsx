import TextArea from '@/src/components/ui/inputs/TextArea';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { AdminFormDataProperty, AdminPropertyById } from '@/src/types/adminTypes/adminProperty';
import Fieldset from '../../../ui/Fieldset';
import ImageMain from './ImageMain';
import ImagesGallery from './ImagesGallery';

type StepThreeProps = {
    register: UseFormRegister<AdminFormDataProperty>;
    errors: FieldErrors<AdminFormDataProperty>
    setValue: UseFormSetValue<AdminFormDataProperty>
    watch: UseFormWatch<AdminFormDataProperty>
    dataProperty?: AdminPropertyById
};

export default function StepThree({ register, errors, setValue, watch, dataProperty }: StepThreeProps) {
    return (
        <>
            <Fieldset>Imagenes y descripción</Fieldset>
            <div className=' flex flex-col gap-4'>

                <ImageMain
                    register={register}
                    watch={watch}
                    errorMessage={errors.imageMain}
                    setValue={setValue}
                />

                <ImagesGallery
                    register={register}
                    watch={watch}
                    errorMessage={Array.isArray(errors.imagesGallery) ? errors.imagesGallery[0] : errors.imagesGallery} 
                    setValue={setValue} 
                />

                <TextArea register={register('description', {
                    required: "La descripción es oblgiatoria",
                    minLength: {
                        value: 15,
                        message: "La descripción debe ser de mínimo 15 caracteres"
                    }
                })}
                    errorMessage={errors.description}
                    label='Descripción'
                    placeholder='Ingrese la descripción de la vivienda'
                    setValue={setValue}
                    defaultData={dataProperty?.location}
                    name='description'
                />
            </div>
        </>
    )
}
