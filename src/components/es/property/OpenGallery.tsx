'use client'
import { useAppStore } from '@/src/store/useAppStore'

type OpenGalleryProps = {
    allImages: string[]
}

export default function OpenGallery({allImages} : OpenGalleryProps) {
    const changeStatusModalGalery = useAppStore(state => state.changeStatusModalGalery)
    const setImagesGalery = useAppStore(state => state.setImagesGalery)
    return (
        <button
            type='button'
            className='absolute bg-zinc-900/75 h-6 w-fit px-1 rounded-md text-zinc-200 font-medium z-10 bottom-1 right-1 hover:bg-zinc-800/90 transition-colors'
            onClick={()=>{
                setImagesGalery(allImages);
                changeStatusModalGalery();
            }}
        >
            Ver Galeria
        </button>
    )
}
