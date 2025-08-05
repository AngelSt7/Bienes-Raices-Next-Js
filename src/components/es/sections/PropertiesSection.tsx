
import { PropertyClient } from '@/src/services/client/property/property-client';
import CardProperty from '../ui/card/CardProperty';
import { Link } from 'lucide-react';

export default async function PropertiesSection() {
  const properties = await PropertyClient.list()
  if (properties) return (
    <div className=' w-11/12 max-w-[1400px] mx-auto space-y-6 mt-5'>
      <h1 className=' text-3xl '>Nuevas propiedades</h1>
      <div className=" grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3  gap-5 mt-5">
        {properties.map(property => (
          <CardProperty key={property.id} property={property} />
        ))}
      </div>
      <div className=' flex justify-end'>
        <Link href='/es/search' className=' text-zinc-900 font-semibold' color="warning">Ver propiedades</Link>
      </div>
    </div>
  )
}
