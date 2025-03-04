import { PublicCard as PublicCarrousel } from "@/src/types/publicTypes/publicProperty";
import { Card, CardBody, Image } from "@heroui/react";
import { Bath, Bed, Building2, Heart } from "lucide-react";
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";
import Link from "next/link";

type CardCarrouselProps = {
    carrouselProperty: PublicCarrousel
}

export default function CardCarrousel({ carrouselProperty }: CardCarrouselProps) {
    return (
        <Card
            isPressable
            isHoverable={true}
            shadow="sm"
        >
            <Link href={`/es/propiedades/${carrouselProperty.id}`}>
                <CardBody className="p-0">
                    <div className="flex relative min-h-[200px] bg-red-100">
                        <Image
                            alt="Propiedad image"
                            height={"100%"}
                            width={"100%"}
                            className="object-cover"
                            radius="sm"
                            shadow="md"
                            fetchPriority="high"
                            src={carrouselProperty.imageMain}
                        />
                    </div>

                    <div className="p-4 space-y-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">
                                    {carrouselProperty.type.type === 'venta' ? 'Venta' : 'Alquiler'}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-xl font-bold">
                                    {formatCurrency(carrouselProperty.price, carrouselProperty.currency.currency)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="font-medium uppercase">{carrouselProperty.district.district}</p>
                            <p className="text-sm text-neutral-600">{carrouselProperty.location}</p>
                        </div>

                        <div className="flex items-center gap-4 text-neutral-600">
                            <div className="flex items-center gap-1">
                                <Building2 size={16} />
                                <span className="text-sm">{carrouselProperty.area}m²</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Bed size={16} />
                                <span className="text-sm">{carrouselProperty.bedrooms} Dorm</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Bath size={16} />
                                <span className="text-sm">{carrouselProperty.bathrooms} Baños</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Link>
        </Card>
    );
}