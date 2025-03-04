import { ERRORS } from "@/src/utils/backend/errors/errors";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { checkPassword, hashPassword } from "@/src/utils/backend/authUtils";
import { userUpdatePasswordSchema } from "@/src/schema/userSchema";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(()=> ({}))
        const validation = validateData(userUpdatePasswordSchema, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })
    
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: ERRORS.UNAUTHORIZED_INFO.message }, { status: ERRORS.UNAUTHORIZED_INFO.status })

        if (session.user && session.user.email) {
            const userSession = await prisma.user.findUnique({where: {email: session.user.email}})
            if(!userSession)
                return NextResponse.json({error: ERRORS.USER_NOT_FOUND.message}, {status: ERRORS.USER_NOT_FOUND.status})
            
            if(userSession.authProvider === 'google') 
                return NextResponse.json({error: ERRORS.EXTERNAL_PROVIDER_UPDATE.message},  {status: ERRORS.EXTERNAL_PROVIDER_UPDATE.status})
            
            const verifyPassword = await checkPassword(validation.data.currentPassword, userSession.password as string)

            if(!verifyPassword){
                return NextResponse.json({error: ERRORS.INCORRECT_PASSWORD.message},  {status: ERRORS.INCORRECT_PASSWORD.status})
            }
                        
            const newPassword = await hashPassword(validation.data.password)

            await prisma.user.update({
                where: { id: userSession.id },
                data: { password: newPassword }
            })
            return NextResponse.json({message: "Credenciales actualizadas correctamente"})
        }
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
