import { Image } from "@heroui/image";
import NextImage from "next/image";

export const LogoInmoAndes = () => {
    return (
        <Image
            src={'/BienesRaicesLogoIndividual.png'}
            as={NextImage}
            layout="responsive"
            width={35}
            height={35}
            priority
            alt="Imagen Bienes Raices"
        />
    );
};