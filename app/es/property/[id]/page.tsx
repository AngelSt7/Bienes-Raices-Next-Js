import Characteristics from '@/src/components/es/property/Characteristics'
import FormContact from '@/src/components/es/property/FormContact'
import ImagesProperty from '@/src/components/es/property/ImagesProperty'
import Map from '@/src/components/es/property/Map'
import ModalContact from '@/src/components/es/property/ModalContact'
import TabsInfo from '@/src/components/es/property/TabsInfo'
import ToopLipContact from '@/src/components/es/property/ToopLipContact'
import UserInfo from '@/src/components/es/property/UserInfo'
import Carrousel from '@/src/components/es/search/error/Carrousel'
import { publicCarrouselProperties } from '@/src/services/client/properties/public/publicCarrouselProperties'
import { publicGetPropertyById } from '@/src/services/client/properties/public/publicGetPropertyById'
import { formatCurrency } from '@/src/utils/frontend/format/currencyUtil'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { LuMapPin } from "react-icons/lu";

export default async function page({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient();
    const { id } = await params

    if (!Number(id) || Number(id) < 0) return notFound()
    const property = await publicGetPropertyById(Number(id))
    await queryClient.prefetchQuery({
        queryKey: [`${property?.type.type}`],
        queryFn: () => publicCarrouselProperties(property?.type.type === 'venta' ? '1' : '2'),
        retry: false,
    });

    const dehydratedState = dehydrate(queryClient);

    if (property) {
        const direction = `${property.location}, ${property.district.district}, ${property.departament.departament}, Perú`
        return (
            <div className='bg-white dark:bg-[#181818] p-4 rounded-lg w-11/12 max-w-[1200px] mx-auto my-4 sm:my-10 shadow-md border border-gray-200 dark:border-[#343434]'>
                <ImagesProperty property={property} />
                <div className='flex w-full my-3 md:my-6 gap-6'>
                    <div className=' flex-col space-y-4 w-full'>
                        <h1 className=' font-semibold text-sm xs:text-base text-foreground-700 dark:text-foreground-500'>
                            {`Vivienda · ${property.area}m² · ${property.bedrooms} dormitorios`}
                        </h1>
                        <p className='mt-0 font-bold text-2xl xs:text-3xl text-zinc-800 dark:text-gray-100'>{property.type.type === 'alquiler' ? `Alquiler ` : ` Venta`}
                            <span className=' mt-0'> · {formatCurrency(property.price, property.currency.currency)}</span>
                        </p>
                        <div className='space-y-4'>
                            <div className='flex flex-row gap-2 items-center'>
                                <LuMapPin />
                                <span className='font-semibold text-sm xs:text-base text-foreground-700 dark:text-foreground-500'>
                                    {direction}
                                </span>
                            </div>
                            <div className='flex w-full my-2 md:my-6 gap-6'>
                                <Map lat={property.latitude} lng={property.longitude} />
                            </div>
                        </div>
                    </div>
                    <div className="hidden xmd:block xmd:min-w-[280px] xmd:max-w-[320px] h-1 z-30 sticky top-20 transition-transform ">
                        <FormContact phoneUser={property.user.phone} direction={direction} />
                    </div>
                </div>
                <Characteristics property={property} />
                <TabsInfo property={property} />
                <UserInfo property={property} />
                <ToopLipContact />
                <ModalContact />
                <div className=' my-4 sm:my-6'>
                    <HydrationBoundary state={dehydratedState}>
                        <Carrousel keyQuery={property.type.type} mode={property.type.type === 'venta' ? "1" : "2"} />
                    </HydrationBoundary>
                </div>
            </div>
        )
    }
}
