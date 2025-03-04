import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#181818] p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600 mb-2">404</h1>
          <div className="text-8xl mb-4">🏠</div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">¡Oops! Propiedad no encontrada</h2>
          <p className="mt-4 text-gray-600 dark:text-slate-200">
            No pudimos encontrar los datos de la propiedad que estás buscando.
            Es posible que haya sido eliminada o que la URL sea incorrecta.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col space-y-3">
          <Link 
            href="/es/search" 
            className="flex items-center justify-center px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a buscar
          </Link>
          
          <Link 
            href="/es" 
            className="px-4 py-3 border border-gray-300 text-gray-700 dark:text-gray-200 rounded-lg text-center hover:bg-gray-100 dark:bg-transparent dark:hover:bg-zinc-800 transition-colors"
          >
            Ir a la Página Principal
          </Link>
        </div>
      </div>
    </div>
  );
}