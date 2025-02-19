import { Departament, District, ImagesToProperty, Property, Service, Type, User } from "@prisma/client";
import { Currency } from "@prisma/client";

export type PropertyComplete = Property & {
    user: User
    currency: Currency,
    type: Type,
    district: District,
    departament: Departament,
    serviceToProperty: Service[],
    imagesToProperty: ImagesToProperty[]
}
