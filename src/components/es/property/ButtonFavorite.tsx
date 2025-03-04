'use client'
import { useAppStore } from '@/src/store/useAppStore';
import { PublicCard } from '@/src/types/publicTypes/publicProperty';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

type ButtonFavoriteProps = {
    property: PublicCard
}

export default function ButtonFavorite({property} : ButtonFavoriteProps ) {
    const propertiesFavorites = useAppStore(state => state.propertiesFavorites)
    const isFavorite = propertiesFavorites.some(item => item.id === property.id);
    const propertyFavorite = useAppStore(state => state.propertyFavorite)

    const toggleFavorite = () => {
        propertyFavorite(property)
        toast.success(
            !isFavorite
                ? 'Añadido correctamente, inicia sesión para ver tus favoritos'
                : 'Propiedad eliminada de favoritos correctamente'
        )
    };

    return (
        <button
            className={`absolute top-[16px] right-[16px] z-10 h-8 w-8 flex items-center justify-center rounded-full dark:bg-zinc-900/60 dark:hover:bg-zinc-800/90 bg-zinc-300/60 hover:bg-zinc-300/90  transition-all duration-300 ${isFavorite ? 'scale-110' : 'scale-100'}`}
            onClick={toggleFavorite}
        >
            <Heart
                size={18}
                className={`transition-all duration-300
            ${isFavorite ? 'text-red-500 fill-red-500 scale-110' : 'text-white font-bold dark:text-zinc-200  fill-transparent scale-100'}`}
            />
        </button>
    )
}
