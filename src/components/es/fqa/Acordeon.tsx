'use client'

import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";

const acordeonData = [
    { 
        tittle: '¿Qué es Inmoandes?', 
        arialLabel: '¿Qué es Inmoandes?', 
        content: 'Inmoandes es una plataforma especializada en la compra, venta y alquiler de bienes raíces en Perú. Conectamos propietarios e interesados de manera segura y eficiente.'
    },
    { 
        tittle: '¿Cómo puedo publicar una propiedad?', 
        arialLabel: '¿Cómo puedo publicar una propiedad?', 
        content: 'Para publicar una propiedad, debes registrarte, completar los datos del inmueble y subir fotos. Una vez verificado, tu anuncio será visible en nuestra plataforma.'
    },
    { 
        tittle: '¿Es seguro comprar o alquilar a través de Inmoandes?', 
        arialLabel: '¿Es seguro comprar o alquilar a través de Inmoandes?', 
        content: 'Sí, verificamos los anuncios y recomendamos que todas las transacciones se realicen con contratos formales. Además, puedes contactar directamente al propietario.'
    },
    { 
        tittle: '¿Qué hago si sospecho de una estafa?', 
        arialLabel: '¿Qué hago si sospecho de una estafa?', 
        content: 'Si detectas un anuncio sospechoso, repórtalo de inmediato a través de nuestro formulario de contacto cuyo enlace estará abajo. También te recomendamos no realizar pagos por adelantado sin verificar la propiedad.',
        link: '/es/contact'
    },
    { 
        tittle: '¿Cómo contacto con el propietario de una propiedad?', 
        arialLabel: '¿Cómo contacto con el propietario de una propiedad?', 
        content: 'Cada propiedad tiene un botón de contacto donde puedes enviar un mensaje al propietario o comunicarte por WhatsApp si el número está disponible.'
    },
    { 
        tittle: '¿Puedo eliminar o editar mi anuncio?', 
        arialLabel: '¿Puedo eliminar o editar mi anuncio?', 
        content: 'Sí, desde tu panel de usuario puedes modificar o eliminar cualquier propiedad que hayas publicado en Inmoandes.'
    },
    { 
        tittle: '¿Cuánto tiempo permanece activa una publicación?', 
        arialLabel: '¿Cuánto tiempo permanece activa una publicación?', 
        content: 'Las publicaciones están activas por 90 días. Puedes renovarlas manualmente antes de que expiren.'
    },
    { 
        tittle: '¿Inmoandes cobra comisiones?', 
        arialLabel: '¿Inmoandes cobra comisiones?', 
        content: 'No cobramos comisiones por transacciones. Sin embargo, ofrecemos planes premium con mayor visibilidad para destacar propiedades.'
    },
    { 
        tittle: '¿Cómo puedo recibir soporte?', 
        arialLabel: '¿Cómo puedo recibir soporte?', 
        content: 'Si necesitas ayuda, contáctanos a través de nuestro formulario de contacto o envíanos un mensaje a nuestro correo de soporte.',
        link: '/es/contact'
    },
    { 
        tittle: '¿Inmoandes ofrece asesoría legal o financiera?', 
        arialLabel: '¿Inmoandes ofrece asesoría legal o financiera?', 
        content: 'No ofrecemos asesoría directa, pero recomendamos consultar con un abogado o agente inmobiliario para garantizar una transacción segura.'
    }
];


export default function Acordeon() {
    return (
        <Accordion variant="shadow">
            {acordeonData.map((acordeon, index) => (
                <AccordionItem key={index} aria-label={acordeon.arialLabel} title={acordeon.tittle}>
                    <div className=" text-justify">
                    {acordeon.content} 
                    
                    { acordeon.link && <Link className=" block focus:underline text-base dark:text-[#e9b122] text-zinc-900 font-bold " href={acordeon.link}>Ir a contacto</Link> }
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
