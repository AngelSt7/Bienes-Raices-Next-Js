'use client'

import { useState } from 'react';
import DataAccountForm from './DataAccountForm';
import BirthDateForm from './BirthDateForm';

export default function CreateAccountForm() {
    const [birthDateCheck, setBirthDateCheck] = useState<boolean>(false)
    const [birthDate, setBirthDate] = useState<string | undefined>(undefined)

    return (
        <div>
            {!birthDateCheck && typeof birthDate === 'undefined' && (
                <BirthDateForm setBirthDateCheck={setBirthDateCheck} setBirthDate={setBirthDate} />
            )}
            {birthDateCheck && typeof birthDate === 'string' && (
                <DataAccountForm birthDate={birthDate} />
            )}
        </div>
    )
}
