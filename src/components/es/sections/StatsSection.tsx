import { HomeIcon, Users2Icon, StarIcon, Building2Icon } from "lucide-react";

export default function StatsSection() {
    const stats = [
        {
            icon: <HomeIcon className="w-8 h-8" />,
            number: "15,000+",
            label: "Propiedades Listadas",
            description: "Encuentra tu hogar ideal entre miles de opciones",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            iconColor: "text-blue-600 dark:text-blue-300",
            hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/30"
        },
        {
            icon: <Users2Icon className="w-8 h-8" />,
            number: "50,000+",
            label: "Clientes Satisfechos",
            description: "Familias que encontraron su hogar perfecto",
            bgColor: "bg-amber-50 dark:bg-amber-900/20",
            iconColor: "text-amber-600 dark:text-amber-300",
            hoverColor: "hover:bg-amber-100 dark:hover:bg-amber-900/30"
        },
        {
            icon: <StarIcon className="w-8 h-8" />,
            number: "4.8/5",
            label: "Calificación Promedio",
            description: "Basado en reseñas de clientes",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
            iconColor: "text-emerald-600 dark:text-emerald-300",
            hoverColor: "hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
        },
        {
            icon: <Building2Icon className="w-8 h-8" />,
            number: "5",
            label: "Distritos",
            description: "Trabajamos en Miraflores, San isidro, Barranco, la molina y Surco, pronto nos expandiremos",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            iconColor: "text-purple-600 dark:text-purple-300",
            hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/30"
        }
    ];

    return (
        <section className="relative w-full my-10 py-16 bg-white dark:bg-zinc-900">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                    backgroundSize: "20px 20px"
                }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-zinc-900 mb-4">
                        Tu Próximo Hogar Está Aquí
                    </h2>
                    <p className="dark:text-zinc-50 text-zinc-800 text-lg max-w-2xl mx-auto">
                        Descubre por qué miles de personas confían en nosotros para encontrar su propiedad ideal
                    </p>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`${stat.bgColor} ${stat.hoverColor} backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}
                        >
                            <div className={`flex justify-center ${stat.iconColor} mb-4`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-bold dark:text-zinc-200 text-zinc-800 mb-2">
                                {stat.number}
                            </h3>
                            <h4 className="text-xl font-semibold dark:text-zinc-50 text-zinc-700 mb-2">
                                {stat.label}
                            </h4>
                            <p className="dark:text-zinc-100 text-zinc-600 text-sm">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}