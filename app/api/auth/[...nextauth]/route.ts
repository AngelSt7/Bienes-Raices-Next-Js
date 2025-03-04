import api from "@/src/axios/axios";
import { credentialsProvider } from "@/src/providers/CredentialsProvider";
import { googleProvider } from "@/src/providers/GoogleProvider";
import { authCreateAccountGoogleSchema } from "@/src/schema/authSchema";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { isAxiosError } from "axios";
import NextAuth, { NextAuthOptions, Session } from "next-auth";

type GoogleProfile = {
    given_name: string;
    family_name: string;
    email: string;
};

interface CustomSession extends Session {
    authError?: string;
    requiresInfo: boolean
}

export const authOptions: NextAuthOptions = {
    providers: [credentialsProvider, googleProvider],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account?.provider === "google" && profile) {
                const googleProfile = profile as GoogleProfile;
                const url = "/auth/google";

                try {
                    const createAccount = {
                        name: googleProfile.given_name,
                        lastname: googleProfile.family_name,
                        email: googleProfile.email,
                        authProvider: "google",
                        confirmed: true,
                    };

                    const user = await api.post(url, createAccount);
                    const validation = validateData(authCreateAccountGoogleSchema, user)
                    if(!validation.success){
                        token.requiresInfo = true
                    } else {
                        token.requiresInfo = false
                    }
                } catch (error) {
                    const errorMessage = isAxiosError(error)
                        ? error.response?.data?.error
                        : "Error de conexión con el servidor";

                    token.authError = errorMessage;
                }
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.authError = token.authError as string | undefined;
            customSession.requiresInfo = Boolean(token.requiresInfo);
            return customSession;
        }            
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
