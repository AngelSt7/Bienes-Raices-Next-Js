import Input from '@/src/components/ui/inputs/Input'
import { Extras, Services } from '@/src/utils/frontend/ui/checkBoxUtils'
import Select from '../../../ui/Select'
import { type } from '@/src/utils/frontend/data/selectUtils'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { AdminFormDataProperty, AdminPropertyById } from '@/src/types/adminTypes/property'
import Fieldset from '../../../ui/Fieldset'
import { FaBed } from "react-icons/fa6"
import { FaBath } from "react-icons/fa6"
import CheckBoxExtras from './CheckBoxExtras'
import CheckBoxServices from './CheckBoxServices'

type StepTwoProps = {
    register: UseFormRegister<AdminFormDataProperty>;
    errors: FieldErrors<AdminFormDataProperty>
    setValue: UseFormSetValue<AdminFormDataProperty>
    watch: UseFormWatch<AdminFormDataProperty>
    dataProperty?: AdminPropertyById
};

export default function StepTwo({ register, errors, setValue, watch, dataProperty }: StepTwoProps) {
    return (
        <>
            <Fieldset>Características principales</Fieldset>
            <div className=' flex flex-col gap-4'>
                <Select
                    watch={watch}
                    name='typeId'
                    label='Tipo'
                    data={type}
                    placeholder="¿Vender o Alquilar?"
                    register={register('typeId', {
                    required: "Debe escoger si vender o alquilar"
                })}
                    errorMessage={errors.typeId}
                    setValue={setValue}
                    defaultData={dataProperty?.typeId}
                />
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Input type='number' label='Dormitorios:' placeholder='Número de dormitorios' register={register('bedrooms', {
                        valueAsNumber : true,
                        required: "El número de dormitorios es obligatorio",
                        min: {
                            value: 1,
                            message: "El mínimo de dormitorios es 1"
                        }
                    })}
                            Icon={FaBed}
                            errorMessage={errors.bedrooms}
                            setValue={setValue}
                        />
                    <Input type='number' label='Baños' placeholder='Número de baños'
                        register={register('bathrooms', {
                            valueAsNumber : true,
                            required: "El número de baños es obligatorio",
                            min: {
                                value: 1,
                                message: "El mínimo de baños es 1"
                            }
                        })}
                            Icon={FaBath}
                            errorMessage={errors.bathrooms} 
                            setValue={setValue}
                        />
                </div>
                <CheckBoxExtras
                    label="Características"
                    data={Extras}   
                    setValue={setValue}
                    watch={watch}                 
                />
                <CheckBoxServices
                    setValue={setValue}
                    label="Servicios"
                    data={Services}
                    watch={watch}   
                />
            </div>
        </>
    )
}
