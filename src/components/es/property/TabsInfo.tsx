'use client'
import { Tabs, Tab } from "@heroui/react";
import { FaSheetPlastic } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { PublicPropertyById } from "@/src/types/publicTypes/publicProperty";

type TabsInfoProps = {
  property: PublicPropertyById
}

export default function TabsInfo({ property }: TabsInfoProps) {
  let TabsInfo = [
    {
      id: "caracteristicas",
      label: "Caracteristicas",
      icon: <FaSheetPlastic />,
      content: [
        property.elevator && "Cuenta con elevador",
        property.furnished && "Está amoblado",
        property.parkingSpaces && "Tiene estacionamiento",
        property.terrace && "Incluye terraza"
      ],
    },
    {
      id: "servicios",
      label: "Servicios",
      icon: <FaLightbulb />,
      content: property.serviceToProperty,
    },
  ];

  return (
    <div className="flex w-fit flex-col">
      <Tabs className=" mx-auto xs:mx-0" aria-label="Dynamic tabs" items={TabsInfo}>
        {(item) => (
          <Tab key={item.id}
            title={
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            }
          >
              <div className="pl-3 capitalize">
                {item.content.length > 0 && (
                  <ul className="list-disc list-inside  grid grid-cols-2 gap-x-5">
                    {item.content.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                )}
              </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
