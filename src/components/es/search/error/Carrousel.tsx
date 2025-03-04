'use client'

import { publicCarrouselProperties } from '@/src/services/client/properties/public/publicCarrouselProperties';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import CardCarrousel from './CardCarrousel';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type CarrouselProps = {
    keyQuery: string,
    mode: '1' | '2' | 'all'
}

export default function Carrousel({keyQuery, mode} : CarrouselProps) {
    console.log(keyQuery)
    console.log(mode)

    const { data: CarrouselData } = useQuery({
        queryFn: () => publicCarrouselProperties(mode),
        queryKey: [keyQuery],
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        retry: false,
    });
    console.log("extrayendo datos del carrousel", CarrouselData)
    if (CarrouselData) return (
        <>
            <p className="text-center font-semibold text-zinc-800 dark:text-slate-50 text-2xl">Propíedades destacadas</p>
            <div className="relative w-11/12 max-w-[1200px] mx-auto">
                <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-sm">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-sm">
                    <ChevronRight className="w-5 h-5" />
                </button>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    slidesPerView="auto"
                    spaceBetween={24}
                    centeredSlides={false}
                    initialSlide={0}
                    breakpoints={{
                        300: { slidesPerView: 1.2, spaceBetween: 20 },
                        500: { slidesPerView: 1.7, spaceBetween: 20 },
                        768: { slidesPerView: 2.6, spaceBetween: 20 },
                        950: { slidesPerView: 2.6, spaceBetween: 20 },
                        1100: { slidesPerView: 3.5, spaceBetween: 20 },
                        1300: { slidesPerView: 4.2, spaceBetween: 24 },
                    }}
                    className="w-full px-2 sm:px-4 mt-8"
                >
                    {CarrouselData.map(item => (
                        <SwiperSlide key={item.id} className="flex justify-center">
                            <CardCarrousel carrouselProperty={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div >
        </>
    )
}
