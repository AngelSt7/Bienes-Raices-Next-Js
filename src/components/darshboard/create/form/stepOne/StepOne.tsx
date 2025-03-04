import Input from '@/src/components/ui/inputs/Input';
import Select from '../../../ui/Select';
import { districts } from '@/src/utils/frontend/data/selectUtils';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { AdminFormDataProperty, AdminPropertyById } from '@/src/types/adminTypes/adminProperty';
import { PiMapPinSimpleAreaFill } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdConstruction } from "react-icons/md";
import Fieldset from '../../../ui/Fieldset';

type StepOneProps = {
    register: UseFormRegister<AdminFormDataProperty>;
    errors: FieldErrors<AdminFormDataProperty>
    setValue: UseFormSetValue<AdminFormDataProperty>
    watch: UseFormWatch<AdminFormDataProperty>
    dataProperty?: AdminPropertyById
};

export default function StepOne({ register, errors, setValue, watch, dataProperty }: StepOneProps) {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Fieldset>Información básica</Fieldset>
            <div className=' flex flex-col gap-4'>
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Select register={register('districtId', {
                        required: 'Debes seleccionar un distrito'
                    })}
                        name='districtId'
                        errorMessage={errors.districtId}
                        watch={watch}
                        setValue={setValue}
                        label='Distrito:'
                        data={districts}
                        placeholder='Seleccione el distrito'
                    />
                    <Input type='text' label='Dirección:' placeholder='Ingrese la dirección de la vivienda' register={
                        register('location', {
                            required: 'La dirección de la vivienda es obligatoria',
                            minLength: { value: 15, message: "La dirección de la vivienda no puede ser menor a 15 caracteres" }
                        })
                    }
                        errorMessage={errors.location}
                        Icon={PiMapPinSimpleAreaFill}
                        setValue={setValue}
                    />
                </div>
                <Input type='number' label='Area total:' placeholder='Ingrese el area de la vivienda' register={
                    register('area', {
                        valueAsNumber: true,
                        required: 'El area de la propiedad es requerida',
                        min: { value: 20, message: "El área mínima es de 20 metros" }
                    })
                }
                    errorMessage={errors.area}
                    Icon={SlSizeFullscreen}
                    setValue={setValue}
                />
                <Input type='number' label='Año de construcción:' placeholder='Ingrese el año de construccion' register={
                    register('yearBuilt', {
                        valueAsNumber: true,
                        required: 'El año de construcción es requerido',
                        min: { value: 1900, message: "El año no debe ser menor a 1900" },
                        max: { value: currentYear, message: "El año de construcción no puede ser en el futuro" }
                    })
                }
                    errorMessage={errors.yearBuilt}
                    Icon={MdConstruction}
                    setValue={setValue}
                />
            </div>
        </>
    )
}
