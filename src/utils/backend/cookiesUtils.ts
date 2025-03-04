import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const serverGetCookie = async () => {
    const cookie = (await cookies()).get('next-auth.session-token')?.value
    return cookie as string
}