'use client'

import { authConfirmAccount } from '@/src/services/server-actions/auth-actions/authConfirmAccount-action'
import { AuthToken } from '@/src/types/authTypes/auth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function ConfirmAccount({ token }: AuthToken) {

    const { data, error, isError } = useQuery({
        queryKey: ['token', token],
        queryFn: () => authConfirmAccount({ token }),
        retry: false,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (error) {
            toast.error(error.message)
            setTimeout(() => {
                redirect('/auth/request-token')
            }, 3000);
        }
    }, [error])

    useEffect(() => {
        if (data) {
            toast.success(data)
        }
    }, [data])

    return (
        <div className=' flex justify-center flex-col gap-1 pb-3 pt-3'>
            {!data ? (
                isError ?
                    <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>
                        Vamos a solicitar un token
                    </h2> 
                    : <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>
                        ¡Estamos validando!
                    </h2>
            ) : (
                <Link href={'/auth/login'} className=' border-2 hover:bg-slate-100 transition-colors w-fit mx-auto px-2 py-1 rounded-md'>Iniciar sesión ahora</Link>
            )}
        </div>
    )
}
