
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/src/components/ui/inputs/Input";
import { useForm } from 'react-hook-form';
import { FilterBedrooms } from "@/src/types/publicTypes/publicProperty";

export default function BedroomFilter() {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const initPrices = { minBedroom: '', maxBedroom: ''}
    const [bedrooms, setBedrooms] = useState(initPrices)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FilterBedrooms>();

    const onSubmit = (data: FilterBedrooms) => {
        reset()
        setBedrooms({maxBedroom: data.maxBedroom.toString(), minBedroom: data.minBedroom.toString()})
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(data).forEach(([key, value]) => {
            if (!Number.isNaN(value)) {
                params.set(key, value.toString());
            }
        })
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleClearParams = () => {
        const params = new URLSearchParams(searchParams.toString())
        Object.keys(bedrooms).forEach((key) => params.delete(key));
        setBedrooms(initPrices)
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button variant="flat" color="secondary">Habitaciones</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full space-y-3">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                            Habitaciones
                        </p>
                        <form noValidate onSubmit={handleSubmit(onSubmit)} action="">
                            <div className="mt-2 flex flex-col gap-2 w-full">
                                <Input htmlFor="minBedroom" type="number" placeholder="Precio Mínimo" variant="floating"
                                    register={register('minBedroom', {
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "El mínimo es 1 habitación"
                                        }
                                    })} errorMessage={errors.minBedroom} />
                                <Input htmlFor="maxBedroom" type="number" placeholder="Precio Máximo" variant="floating"
                                    register={register('maxBedroom', {
                                        valueAsNumber: true,
                                        max: {
                                            value: 3,
                                            message: "El máximo es 3 habitaciones"
                                        }
                                    })} errorMessage={errors.maxBedroom} />
                            </div>
                            <div className="flex gap-3 mt-3">
                                <Button radius="sm" color="warning" fullWidth onPress={() => handleClearParams()}>Limpiar</Button>
                                <Button radius="sm" color="warning" fullWidth type="submit">Aplicar</Button>
                            </div>
                        </form>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
