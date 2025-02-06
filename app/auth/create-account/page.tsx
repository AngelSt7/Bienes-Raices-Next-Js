import CreateAccountForm from '@/src/components/auth/create-account/CreateAccountForm'
import LinkToAuth from '@/src/components/auth/ui/LinkToAuth'
import React from 'react'

export default function CreateAccountPage() {
  return (
    <>
      <CreateAccountForm />
      <div className=' my-4'>
        <LinkToAuth
          href="/auth/login"
          message="¿Ya tienes cuenta?"
          label="Iniciar sesión"
        />
      </div>
    </>
  )
}