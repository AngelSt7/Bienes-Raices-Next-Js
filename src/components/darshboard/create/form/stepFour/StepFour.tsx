import Input from '@/src/components/ui/inputs/Input'
import Select from '../../../ui/Select'
import { Currency } from '@/src/utils/frontend/data/selectUtils'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { AdminFormDataProperty, AdminPropertyById } from '@/src/types/adminTypes/adminProperty';
import Fieldset from '../../../ui/Fieldset';

type StepThreeProps = {
    register: UseFormRegister<AdminFormDataProperty>;
    errors: FieldErrors<AdminFormDataProperty>
    setValue: UseFormSetValue<AdminFormDataProperty>
    watch: UseFormWatch<AdminFormDataProperty>
    dataProperty?: AdminPropertyById
};

export default function StepFour({ register, errors, setValue, watch, dataProperty }: StepThreeProps) {
    return (
        <>
            <Fieldset>Precio y moneda</Fieldset>
            <div className=' flex flex-col gap-4'>
                <Input register={register('price', 
                    {valueAsNumber : true, required: 'El precio de la propiedad'})}
                    type='number'
                    label='Precio'
                    errorMessage={errors.price}
                    placeholder='Ingrese el precio de alquiler o venta' 
                    setValue={setValue}
                    defaultData={dataProperty?.price}
                    name='price'
                />
                <Select setValue={setValue} register={register('currencyId', { required: 'Debes seleccionar una moneda' })} data={Currency} errorMessage={errors.districtId} name='currencyId' watch={watch} label='Moneda' placeholder='Seleccione la moneda que desea recibir' />
            </div>
        </>
    )
}
