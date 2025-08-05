'use client'

// import { adminGetDetailsPropertyInModal } from "@/src/services/client/properties/admin/adminGetDetailsPropertyInModal";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter, useSearchParams } from "next/navigation"
import DetailsModal from "./DetailsModal";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoadingModal() {
    const params = useSearchParams();
    const router = useRouter()
    const propertyId = params.get('property')
    const page = params.get('page')

    if(propertyId){
        if (!Number(propertyId) || Number(propertyId) < 0 ) {
            redirect (`/dashboard/properties?page=${page}`)
        } 
    }

    const { data: detailsPropertyModal, error: errorCause, isError } = useQuery({
        queryKey: ['details', propertyId],
        // queryFn: () => adminGetDetailsPropertyInModal(Number(propertyId)),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!propertyId
    })

    useEffect(() => {
        if (errorCause) {
            router.replace('/dashboard/properties?page=1'); 
            toast.error(errorCause?.message);
        }
    }, [isError, errorCause, router]);


    if (detailsPropertyModal) return <DetailsModal detailsPropertyModal={detailsPropertyModal} />
}
