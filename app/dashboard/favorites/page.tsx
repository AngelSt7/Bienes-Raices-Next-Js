'use client'

import CardProperty from "@/src/components/es/ui/card/CardProperty"
import { useAppStore } from "@/src/store/useAppStore"

export default function page() {
  const propertiesFavorites = useAppStore(state => state.propertiesFavorites)
  return (
    <div className=' w-11/12 max-w-[1400px] mx-auto space-y-6 mt-5'>
      <h1 className=' text-3xl text-center font-black'>Tus Favoritos</h1>
      <p className='text-center font-semibold'>Esta sección está disponible unicamente</p>
      {propertiesFavorites.length === 0 ? (
        <p className=" text-center">No hay propiedades marcadas como favoritas</p>
      ) : (
        <div className=" grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3  gap-5 mt-5">
        {propertiesFavorites.map(property => (
          <CardProperty key={property.id} property={property} />
        ))}
      </div>
      ) }

    </div>
  )
}
