import React from 'react'

type ErrorsAuthProps = {
    errorMessage: string
}

export default function ErrorsAuth({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-red-500 font-medium text-xs mt-1">{children}</p>
    )
}
