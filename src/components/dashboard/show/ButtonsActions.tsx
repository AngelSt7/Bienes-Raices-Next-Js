import { AdminProperty } from '@/src/types/adminTypes/property';
import { Tooltip } from '@heroui/react';
import React, { memo } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/src/store/useAppStore';

type ButtonsActionsProps = {
    id: AdminProperty['id'];
};

const ButtonsActions = ({ id }: ButtonsActionsProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setDeleteId = useAppStore(state => state.setDeleteId)
    const handleViewDetails = () => {
        const params = new URLSearchParams(searchParams.toString()); 
        params.set('property', id.toString());
        router.push(`/dashboard/properties?${params.toString()}`); 
    };

    return (
        <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Abrir modal">
                <FaEye
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={handleViewDetails} 
                />
            </Tooltip>
            <Tooltip content="Edit propiedad">
                <Link href={`/dashboard/properties/${id}/edit`} prefetch={true}>
                    <AiOutlineEdit className="text-lg text-default-400 cursor-pointer active:opacity-50"/>
                </Link>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar propiedad">
                <MdDeleteForever onClick={()=> setDeleteId(id)} className="text-lg text-danger cursor-pointer active:opacity-50" />
            </Tooltip>
        </div>
    );
};

export default memo(ButtonsActions);
