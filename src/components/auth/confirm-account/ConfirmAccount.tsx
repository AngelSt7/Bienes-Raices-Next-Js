import { AuthToken } from '@/src/types/authTypes'
import Link from 'next/link'

export default function ConfirmAccount({ token }: AuthToken) {
    return (
        <div className=' flex justify-center flex-col gap-1 pb-3 pt-3'>
            <Link href={'/'} className=' border-2 hover:bg-slate-100 transition-colors w-fit mx-auto px-2 py-1 rounded-md'>Iniciar sesión ahora</Link>
        </div>
    )
}
