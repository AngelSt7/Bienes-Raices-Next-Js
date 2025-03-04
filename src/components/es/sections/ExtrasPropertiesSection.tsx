import { publicGetProperties } from '@/src/services/client/properties/public/publicGetProperties'
import React from 'react'
import CardProperty from '../ui/card/CardProperty'
import { Button } from '@heroui/react'
import Link from 'next/link'

const PROPERTY_SECTIONS = {
  sale: {
    type: 'type=1',
    title: 'Nuevas propiedades en venta',
    buttonText: 'Ver propiedades en venta'
  },
  rent: {
    type: 'type=2',
    title: 'Nuevas propiedades en alquiler',
    buttonText: 'Ver propiedades en alquiler'
  }
}

export default async function ExtrasPropertiesSection() {

  const propertiesData = await Promise.all([
    publicGetProperties(PROPERTY_SECTIONS.sale.type),
    publicGetProperties(PROPERTY_SECTIONS.rent.type)
  ])

  return (
    <div className="my-10 w-11/12 max-w-[1400px] mx-auto ">
      {Object.entries(PROPERTY_SECTIONS).map(([key, section], index) => {
        const properties = propertiesData[index]
        
        if (!properties) return null

        return (
          <div key={key} className="space-y-6">
            <h1 className="text-3xl">{section.title}</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {properties.map(property => (
                <CardProperty key={property.id} property={property} />
              ))}
            </div>
            <div className="flex justify-end">
              <Link href='/es/search' className=' text-zinc-900 font-semibold' color="warning">{section.buttonText}</Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}