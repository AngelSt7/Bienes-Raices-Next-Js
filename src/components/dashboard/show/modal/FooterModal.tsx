import { Button } from '@heroui/react'
import React from 'react'

type FooterModalProps = {
    onClose: () => void
}

export default function FooterModal({onClose} : FooterModalProps) {
    return (
        <>
            <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="font-medium min-w-[80px] md:min-w-[100px] rounded-xl text-sm md:text-base"
            >
                Cerrar
            </Button>
            <Button
                color="default"
                onPress={onClose}
                className="font-medium min-w-[80px] md:min-w-[100px] rounded-xl text-sm md:text-base"
            >
                Ver anuncio
            </Button>
        </>
    )
}
