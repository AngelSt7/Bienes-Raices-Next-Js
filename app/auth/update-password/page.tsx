'use client'

import LinkToAuth from "@/src/components/auth/ui/LinkToAuth";
import NewPassword from "@/src/components/auth/update-password/NewPassword";
import TokenToResetPassword from "@/src/components/auth/update-password/TokenToResetPassword";
import { AuthToken } from "@/src/types/authTypes";
import Link from "next/link";
import { useState } from "react";

export default function page() {
    const [token, setToken] = useState<AuthToken['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <div>
            {!isValidToken
                ? <TokenToResetPassword setToken={setToken} setIsValidToken={setIsValidToken} />
                : <NewPassword token={token} />
            }
            <div className=' my-4 flex flex-col sm:flex-row justify-between px-6 gap-2'>
                <LinkToAuth
                    href="/auth/create-account"
                    message="¿No tienes cuenta?"
                    label="Crea una ahora"
                />
                <LinkToAuth
                    href="/auth/forgot-password"
                    message="¿Token expirado?"
                    label="Solicitar uno"
                />
            </div>
        </div>
    )
}
