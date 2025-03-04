import { PublicPropertyById } from "@/src/types/publicTypes/publicProperty"
import { FaRulerCombined, FaBed, FaBath, FaCalendarAlt } from "react-icons/fa";

type CharacteristicsyProps = {
    property: PublicPropertyById
}

export default function Characteristics({ property }: CharacteristicsyProps) {
    const year = new Date().getFullYear();
    let dataProperty = [
        {
            name: "Área",
            quantity: `${property.area} m2`,
            icon: <FaRulerCombined />,
        },
        {
            name: "Habitaciones",
            quantity: property.bedrooms,
            icon: <FaBed />,
        },
        {
            name: "Baños",
            quantity: property.bathrooms,
            icon: <FaBath />,
        },
        {
            name: "Antiguedad",
            quantity: `${year - property.yearBuilt} años`,
            icon: <FaCalendarAlt />,
        },
    ];

    // 24
    return (
        <div className="w-full xmd:min-w-[calc(100%-304px)] xmd:max-w-[calc(100%-344px)] my-2 md:my-8 grid grid-cols-2 md:grid-cols-4 gap-5 bg-white dark:bg-[#181818] py-2 md:py-6 px-2 rounded-lg">
            {dataProperty.map(item => (
                <div key={item.name} className=" flex justify-center items-center flex-col w-full gap-2">
                    <div className=" text-3xl text-zinc-800 dark:text-gray-200">{item.icon}</div>
                    <div className=" text-sm sm:text-base font-semibold text-zinc-900 dark:text-gray-100">{item.name}: {item.quantity}</div>
                </div>
            ))}
        </div>
    )
}
