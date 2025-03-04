
'use client'
import { PublicPropertyById } from '@/src/types/publicTypes/publicProperty';
import { Image } from '@heroui/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import OpenGallery from './OpenGallery';
import GalleryProperty from './GalleryProperty';
import ButtonFavorite from './ButtonFavorite';

type ImagesPropertyProps = {
    property: PublicPropertyById
}

export default function ImagesProperty({ property }: ImagesPropertyProps) {
    const allImages = [property.imageMain, ...property.imagesToProperty];
    const imagesExtra = property.imagesToProperty.slice(0, 4)
    const imagePairs = [
        [imagesExtra[0], imagesExtra[1]],
        [imagesExtra[2], imagesExtra[3]]
    ];

    return (
        <>
            <div className='relative grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[200px] xs:min-h-[300px] md:min-h-[450px]'>
                <Image
                    alt="Imagen principal de propiedad"
                    height="100%"
                    width="100%"
                    className="object-cover"
                    radius="sm"
                    shadow="md"
                    fetchPriority="high"
                    loading='lazy'
                    src={property.imageMain}
                />
                <div className='hidden md:grid grid-rows-2 gap-4'>
                    {imagePairs.map((pair, rowIndex) => (
                        <div key={rowIndex} className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <Image
                                alt={`Imagen secundaria ${rowIndex * 2 + 1}`}
                                height="100%"
                                width="100%"
                                className="object-cover"
                                radius="sm"
                                shadow="md"
                                fetchPriority="high"
                                loading='lazy'
                                src={pair[0]}
                            />
                            <div className='hidden lg:flex'>
                                <Image
                                    alt={`Imagen secundaria ${rowIndex * 2 + 2}`}
                                    height="100%"
                                    width="100%"
                                    className="object-cover"
                                    radius="sm"
                                    shadow="md"
                                    fetchPriority="high"
                                    loading='lazy'
                                    src={pair[1]}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <OpenGallery allImages={allImages} />
            </div>
            <GalleryProperty />
        </>
    )
}