import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/src/axios/axios";
import { isAxiosError } from "axios";

export const credentialsProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
        const url = "/auth/login";
        try {
            const response = await api.post(url, credentials);
            return {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                image: null
            };
        } catch (error) {
            const errorMessage = isAxiosError(error) 
                ? error.response?.data?.error
                : "Error de conexión con el servidor";
            throw new Error(errorMessage);
        }
    }   
});

