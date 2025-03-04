'use client'

import { authValidateToken } from "@/src/services/server-actions/auth-actions/authValidateToken-action";
import { InputOtp } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

type PinInputProps = {
  setToken: Dispatch<SetStateAction<string>>
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PinInput({ setToken, setIsValidToken }: PinInputProps) {
  const [value, setValue] = useState("");

  const { mutate } = useMutation({
    mutationFn: authValidateToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      setIsValidToken(true)
    }
  })

  useEffect(() => {
    if (value.length === 6) {
      mutate({token: value});
      setToken(value);
    }
  }, [value, mutate, setToken]);
  
  return (
    <div className="flex flex-col justify-center items-center gap-2 rounded-xl w-fit mx-auto p-2">
      <InputOtp isRequired={false} color="warning" size="lg" length={6} value={value} onValueChange={setValue} errorMessage="Completa el codigo para continuar" />
    </div>
  );
}
