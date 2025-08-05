'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import CardProperty from '../../ui/card/CardProperty';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { publicSearchProperties } from '@/src/services/client/properties/public/publicSearchProperties';
import { ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { searchFiltersArray } from '@/app/es/search/page';
import { Button } from '@heroui/react';

type SearchProps = {
    children: ReactNode
}

export default function Search({ children }: SearchProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const clearURLParams = () => {
        const searchParams = new URLSearchParams();
        router.replace(`${pathname}?${searchParams.toString()}`, { scroll: false });
    };

    const allFilters = Object.fromEntries(searchParams.entries());

    const searchFilters = Object.fromEntries(
        Object.entries(allFilters).filter(([key, value]) =>
            searchFiltersArray.includes(key) && value !== undefined
        )
    );

    const { data: PropertiesData, error, isError } = useQuery({
        queryFn: () => publicSearchProperties(searchFilters),
        queryKey: ['searchProperties', searchFilters],
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            toast.error(error.message);
        }
    }, [isError, error]);

    return (
        <div className="w-11/12 max-w-[1400px] mx-auto space-y-6 mb-10 md:mt-5 mt-2  ">
            {PropertiesData && PropertiesData.properties.length > 0 ? (
                <>
                    <h1 className="text-center font-black text-4xl">Resultados</h1>
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {PropertiesData.properties.map(property => (
                            <CardProperty key={property.id} property={property} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className=' flex justify-center flex-col gap-4'>
                        <h2 className="text-center font-black text-4xl">
                            No se encontraron resultados para tu búsqueda
                        </h2>
                        <Button variant='flat' color='secondary' className=' mx-auto' onPress={() => clearURLParams()}>Limpiar filtros</Button>
                    </div>
                    {children}
                </>
            )}
        </div>
    );
}
