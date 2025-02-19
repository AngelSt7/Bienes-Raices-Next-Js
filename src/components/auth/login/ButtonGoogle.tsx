import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CustomSession = {
    authError?: string;
};

export default function ButtonGoogle() {
    const router = useRouter();
    const { data: session } = useSession();
    const [errorShow, setErrorShow] = useState(false);

    useEffect(() => {
        const sessionError = session as CustomSession;
        if (sessionError?.authError && !errorShow) {
            toast.error(sessionError.authError);
            setErrorShow(true);
        }
    }, [session, errorShow]);

    const handleGoogleSignIn = async () => {
        const response = await signIn("google", { redirect: false });
        if (response?.error) {
            toast.error("Error de autenticación. Intenta de nuevo.");
            return;
        } else {
            router.replace("/dashboard/properties");
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
