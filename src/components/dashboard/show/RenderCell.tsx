import { Key, memo } from "react";
import { User as ImageProperty, Chip } from "@heroui/react";
import { AdminProperty } from "@/src/types/adminTypes/property";
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";
import { formatDateLong } from "@/src/utils/frontend/format/dateUtils";
import ButtonsActions from "./ButtonsActions";

type RenderCellProps = {
    property: AdminProperty
    columnKey: Key
}

const RenderCell = memo(({ property, columnKey }: RenderCellProps) => {
    const theme = property.availability ? "success" : "danger";

    switch (columnKey) {
        case "location":
            return (
                <div className="  min-w-36  ">
                    <ImageProperty
                        avatarProps={{ radius: "lg", src: property.imageMain }}
                        description={formatDateLong(property.publishedAt)}
                        name={property.location}
                        className=" hidden sm:flex justify-start"
                    />
                    <div className="  sm:hidden">
                        <p className="text-bold text-sm capitalize ">
                            {property.location}
                        </p>
                        <p className="text-bold text-sm capitalize text-default-400">
                            {formatDateLong(property.publishedAt)}
                        </p>
                    </div>
                </div>
            );
        case "availability":
            return (
                <Chip className="capitalize" color={theme} size="sm" variant="flat">
                    {property.availability ? "Disponible" : "No disponible"}
                </Chip>
            );
        case "type":
            return <p className="text-bold text-sm capitalize">{property.type.type}</p>;
        case "price":
            return <div className=" min-w-24">
                <p className={`${property.type.type === 'venta' ? 'hidden' : ''} text-bold text-xs capitalize text-default-400`}>Por mes</p>
                <p className="text-bold text-sm capitalize ">
                    {formatCurrency(property.price, property.currency.currency)}
                </p>
            </div>
        case "actions":
            return (
                <ButtonsActions id={property.id} />
            );
    }

    return null;
});

export default RenderCell;
