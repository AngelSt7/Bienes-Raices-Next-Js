'use client'

import { InputOtp } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PinInputProps = {
    setToken: Dispatch<SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PinInput({ setToken, setIsValidToken } : PinInputProps) {
  const [value, setValue] = useState("");

  useEffect(()=> {
    if(value.length === 6){
        setToken(value)
        setIsValidToken(true)
    }
  }, [value])

  return (
    <div className="flex flex-col justify-center items-center gap-2 rounded-xl w-fit mx-auto p-2">
      <InputOtp isRequired={false} color="warning" size="lg" length={6} value={value} onValueChange={setValue} errorMessage="Completa el codigo para continuar"/>
    </div>
  );
}
