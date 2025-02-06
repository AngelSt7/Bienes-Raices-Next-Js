import ForgotPasswordForm from '@/src/components/auth/forgot-password/ForgotPasswordForm'
import LinkToAuth from '@/src/components/auth/ui/LinkToAuth'

export default function ForgotPasswordPage() {
  return (
    <>
      <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Te enviaremos un email para recuperar tu acceso, porfavor, ingresa tu email a continuación:</h2>
      <ForgotPasswordForm />
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