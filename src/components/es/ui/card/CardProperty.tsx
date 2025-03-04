import { Card, CardBody, Image } from "@heroui/react";
import { PublicCard } from "@/src/types/publicTypes/publicProperty";
import { formatDateLong } from "@/src/utils/frontend/format/dateUtils";
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";
import { Building2, Calendar, MapPin, Bath, Bed, Heart } from "lucide-react";
import Link from "next/link";
import ButtonFavorite from "../../property/ButtonFavorite";

type CardPropertyProps = {
  property: PublicCard
}

export default function CardProperty({ property }: CardPropertyProps) {
  return (
    <div className=" relative">
      <Card
        isPressable
        isHoverable={true}
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-full"
        shadow="sm"
      >
        <Link href={`/es/property/${property.id}`}>
          <CardBody className="grid grid-cols-1 gap-3 w-full">
            <div className="flex relative min-h-[200px]">
              <Image
                alt="Album cover"
                height="100%"
                width="100%"
                className="object-cover"
                radius="sm"
                shadow="md"
                fetchPriority="high"
                src={property.imageMain}
              />
            </div>
            <div className="relative flex flex-col">
              <div className="flex flex-col gap-2 flex-1">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-foreground/90 line-clamp-1 md:line-clamp-2">
                    {property.location}
                  </h3>

                  <div className="flex items-center gap-1 text-foreground/70">
                    <Calendar size={16} />
                    <p className="text-sm">{formatDateLong(property.publishedAt.toString())}</p>
                  </div>
                  <div className="flex items-center gap-1 text-foreground/70">
                    <MapPin size={16} />
                    <p className="text-sm font-medium">{property.district.district}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2">
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Building2 size={16} />
                    <span className="text-sm">{property.area}m²</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Bath size={16} />
                    <span className="text-sm">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Bed size={16} />
                    <span className="text-sm">{property.bedrooms}</span>
                  </div>
                </div>
              </div>

              <p className="text-xl font-bold text-foreground/90 mt-2">
                {formatCurrency(property.price, property.currency.currency)}
                <span className=" text-xs">{property.type.type === 'alquiler' && ' al mes'}</span>
              </p>
            </div>
          </CardBody>
        </Link>
      </Card>
        <ButtonFavorite property={property} />
    </div>
  );
}