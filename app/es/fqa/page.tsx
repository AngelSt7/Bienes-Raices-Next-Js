import Acordeon from "@/src/components/es/fqa/Acordeon";


export default function page() {
    return (
        <div className="w-11/12 max-w-[600px] mx-auto my-4 sm:my-10 shadow-md bg-white dark:bg-[#181818] p-6 rounded-xl">
            <h1 className="text-center text-3xl font-bold mb-2 text-zinc-800 dark:text-zinc-100 font-sans">Bienvenido a nuestra sección de preguntas</h1>
            <p className="text-center text-zinc-600 dark:text-zinc-300 mb-6 text-lg">Estas son algunas preguntas frecuentes</p>
            <Acordeon />
        </div>
    )
}
