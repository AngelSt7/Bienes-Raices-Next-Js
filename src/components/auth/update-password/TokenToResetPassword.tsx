import { AuthToken } from '@/src/types/authTypes'
import React, { Dispatch, SetStateAction } from 'react'
import PinInput from '../ui/PinInput'

type TokenToResetPasswordProps = {
    setToken: Dispatch<SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TokenToResetPassword({ setToken, setIsValidToken }: TokenToResetPasswordProps) {
    return (
        <>
            <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Completa el código que llegó a tu email e inmediatamente será validado</h2>
            <PinInput setToken={setToken} setIsValidToken={setIsValidToken} />
        </>
    )
}
