import { AdminModalProperty } from '@/src/types/adminTypes/property';
import { Wifi, Lock, Lightbulb, Droplets, Flame, Dumbbell, Utensils, Trees, WavesLadder, PartyPopper, Home } from 'lucide-react';

type ServicesModalProps = {
    serviceToProperty: AdminModalProperty['serviceToProperty']
}

const serviceIcons: { [key: string]: any } = {
    'internet': Wifi,
    'seguridad 24h': Lock,
    'luz': Lightbulb,
    'agua': Droplets,
    'gas natural': Flame,
    'gimnasio': Dumbbell,
    'area de parrillas': Utensils,
    'areas verdes': Trees,
    'piscina': WavesLadder,
    'sala de eventos': PartyPopper
};

export default function ServicesModal({ serviceToProperty } : ServicesModalProps) {
    return (
        <div className="border-t border-t-zinc-300 dark:border-t-neutral-200/20 pt-3 md:pt-4">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-4 text-zinc-900 dark:text-neutral-100">
                Servicios
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {serviceToProperty.map((service, index) => {
                    const ServiceIcon = serviceIcons[service.service] || Home;
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full"></div>
                            <ServiceIcon className="w-3 h-3 md:w-4 md:h-4 text-[#f5a524]" />
                            <span className="text-sm md:text-sm lg:text-base capitalize text-zinc-700 dark:text-neutral-300 break-words">
                                {service.service}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
