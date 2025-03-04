import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CustomSession = {
    authError?: string;
    requiresInfo?: boolean;
};

export default function ButtonGoogle() {
    const router = useRouter();
    const { data: session } = useSession();
    const [errorShow, setErrorShow] = useState(false);

    useEffect(() => {
        const sessionError = session as CustomSession;
        if (sessionError && sessionError.authError && !errorShow) {
            toast.error(sessionError.authError);
            setErrorShow(true);
        }
        if (sessionError && sessionError.requiresInfo) {
            router.replace("/complete-profile"); 
        }
    }, [session, errorShow]);

    const handleGoogleSignIn = async () => {
        console.log("Iniciando sesión con Google...");
    
        const response = await signIn("google", { redirect: false });
    
        if (response?.error) {
            console.error("Error en la autenticación:", response.error);
            toast.error("Error de autenticación. Intenta de nuevo.");
            return;
        }
    
        console.log("Autenticación exitosa. Obteniendo sesión actualizada...");
    
        // Recargar la sesión manualmente
        const updatedSession = await fetch("/api/auth/session")
            .then((res) => res.json())
            .catch((err) => {
                console.error("Error al obtener la sesión:", err);
                return null;
            });
    
        console.log("Sesión obtenida:", updatedSession);
    
        if (updatedSession?.requiresInfo) {
            console.log("Faltan datos del usuario. Redirigiendo a /complete-profile");
            router.replace("/auth/complete-profile"); 
        } else {
            console.log("Sesión completa. Redirigiendo al dashboard");
            router.replace("/dashboard/properties?page=1");
        }
    };
    
    

    return (
        <div className="flex justify-center mt-4">
            <button onClick={handleGoogleSignIn}>
                <Image priority src="/Google.png" alt="Login Google" width={30} height={30} />
            </button>
        </div>
    );
}
