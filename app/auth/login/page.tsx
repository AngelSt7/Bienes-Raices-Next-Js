import LoginForm from '@/src/components/auth/login/LoginForm'
import LinkToAuth from '@/src/components/auth/ui/LinkToAuth'

export default function LoginPage() {
    return (
        <>
            <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-300 font-semibold text-center'>¡Bienvenido de nuevo! Inicia sesión a continuación.</h2>
            <LoginForm />
            <div className=' my-4 flex flex-col sm:flex-row justify-between px-6 gap-2'>
                <LinkToAuth
                    href="/auth/create-account"
                    message="¿No tienes cuenta?"
                    label="Crea una ahora"
                />
                <LinkToAuth
                    href="/auth/create-account"
                    message="¿Olvidaste tu contraseña?"
                    label="Recuperar"
                />
            </div>
        </>
    )
}