import EditPropertyForm from '@/src/components/darshboard/edit/EditPropertyForm';
import { adminGetPropertyById } from '@/src/services/client/properties/admin/adminGetPropertyById';
import { serverGetCookie } from '@/src/utils/backend/cookiesUtils';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

export default async function EditPage({ params }: { params: { id: string } }) {
    const { id } = await params
    if (!Number(id) || Number(id) < 0) return redirect('/dashboard/properties?page=1')
    const token = await serverGetCookie()

    try {
        const data = await adminGetPropertyById({ id: Number(id), token })
        console.log(id)
        if(data) {
            return (
                <div className=" w-11/12 max-w-[700px] mx-auto bg-white dark:bg-[#121212] p-6 shadow-sm rounded-xl">
                    <EditPropertyForm id={Number(id)} dataProperty={data} /> 
                </div>
            )
        }
    } catch {
        return notFound();
    }
}
