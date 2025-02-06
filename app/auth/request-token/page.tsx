import ReequestTokenForm from '@/src/components/auth/request-token/ReequestTokenPage'
import LinkToAuth from '@/src/components/auth/ui/LinkToAuth'

export default function ReequestTokenPage() {
  return (
    <>
      <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Ingresa tu email para solicitar y enviarte un nuevo token</h2>
      <ReequestTokenForm />
      <div className=' my-4 flex justify-between px-6'>
        <LinkToAuth
          href="/auth/login"
          message="¿Ya tienes cuenta?"
          label="Iniciar sesión"
        />
        <LinkToAuth
          href="/auth/create-account"
          message="¿No tienes cuenta?"
          label="Crea una ahora"
        />
      </div>
    </>
  )
}