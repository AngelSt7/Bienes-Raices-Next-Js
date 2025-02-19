import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600">¡Oops! 🚧</h1>
        <p className="text-lg mt-2">A nosotros tampoco nos gusta que vean nuestros datos. 🔒</p>
        <Link href="/dashboard/properties?page=1" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Volver al Dashboard
        </Link>
      </div>
    );
  }
  