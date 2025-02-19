import Logo from "@/src/components/ui/Logos/Logo";
import { Home } from "lucide-react";

export const messages = {
    create: {
        icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
        title: "Crear Propiedad",
        description: "Completa el formulario para agregar una nueva propiedad"
    },
    properties: {
        icon: <Logo logo={'/BienesRaicesLogoIndividual.png'} />,
        title: "Mis Propiedades",
        description: "Administra todas tus propiedades registradas"
    },
    edit: {
        icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
        title: "Editar Propiedad",
        description: "Modifica los detalles de tu propiedad"
    },
    view: {
        icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
        title: "Detalles de Propiedad",
        description: "Visualiza toda la información de tu propiedad"
    },
    default: {
        icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
        title: "Propiedades",
        description: "Gestiona tus propiedades de manera eficiente"
    }
} as const