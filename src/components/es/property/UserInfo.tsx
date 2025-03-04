import { PublicPropertyById } from '@/src/types/publicTypes/publicProperty';
import { User, FileText, Mail, Phone } from 'lucide-react';

type UserInfoProps = {
    property: PublicPropertyById
}

export default function UserInfo({property} : UserInfoProps) {
    return (
        <div className="p-4 rounded-lg ">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                Datos del anunciante
            </h2>

            <div className="space-y-3">
                <p className="flex items-center text-gray-700 dark:text-gray-200">
                    <User className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="text-base font-medium mr-2">Nombre:</span>
                    <span className=' capitalize'>{property.user.name}</span>
                </p>

                <p className="flex items-center text-gray-700 dark:text-gray-200">
                    <FileText className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="text-base font-medium mr-2">Apellidos:</span>
                    <span className=' capitalize'>{property.user.lastname}</span>
                </p>

                <p className="flex items-center text-gray-700 dark:text-gray-200">
                    <Mail className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="text-base font-medium mr-2">Email:</span>
                    <span>{property.user.email}</span>
                </p>

                <p className="flex items-center text-gray-700 dark:text-gray-200">
                    <Phone className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="text-base font-medium mr-2">Teléfono:</span>
                    <span>{property.user.phone}</span>
                </p>
            </div>
        </div>
    )
}
