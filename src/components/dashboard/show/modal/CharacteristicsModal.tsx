import { AdminModalProperty } from '@/src/types/adminTypes/property';
import { Home, Bed, Bath, Square, Calendar, DollarSign } from 'lucide-react';

type CharacteristicsModalProps = {
    detailsPropertyModal: AdminModalProperty
}

export default function CharacteristicsModal({ detailsPropertyModal } : CharacteristicsModalProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
                { icon: DollarSign, label: 'Precio', value: `${detailsPropertyModal.price.toLocaleString()} ${detailsPropertyModal.currency.currency}` },
                { icon: Bed, label: 'Dormitorios', value: detailsPropertyModal.bedrooms },
                { icon: Bath, label: 'Baños', value: detailsPropertyModal.bathrooms },
                { icon: Square, label: 'Área', value: `${detailsPropertyModal.area} m²` },
                { icon: Calendar, label: 'Año', value: detailsPropertyModal.yearBuilt },
                { icon: Home, label: 'Distrito', value: detailsPropertyModal.district.district }
            ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                    <item.icon className="w-3 h-3 md:w-4 md:h-4 text-[#f5a524]" />
                    <div>
                        <p className="text-xs md:text-sm text-zinc-500 dark:text-neutral-400">{item.label}</p>
                        <p className="text-sm md:text-sm lg:text-base text-zinc-700 font-medium dark:text-neutral-200 capitalize break-words">
                            {item.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
