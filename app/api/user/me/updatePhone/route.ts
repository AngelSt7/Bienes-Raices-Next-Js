import { ERRORS } from "@/src/utils/backend/errors/errors";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/src/config/prisma";
import { userUpdatePhoneSchema } from "@/src/schema/userSchema";
import { validateData } from "@/src/utils/backend/validations/validateData";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(()=> ({}))
        const validation = validateData(userUpdatePhoneSchema, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 })
    
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: ERRORS.UNAUTHORIZED_INFO.message }, { status: ERRORS.UNAUTHORIZED_INFO.status })

        if (session.user && session.user.email) {
            const userSession = await prisma.user.findUnique({where: {email: session.user.email}})
            if(!userSession)
                return NextResponse.json({error: ERRORS.USER_NOT_FOUND.message}, {status: ERRORS.USER_NOT_FOUND.status})

            if(userSession.phone === validation.data.phone) 
                return NextResponse.json({error: ERRORS.DUPLICATE_UPDATE.message}, {status: ERRORS.DUPLICATE_UPDATE.status})

            const user = await prisma.user.findFirst({ where: { phone: Number(validation.data.phone) } })
            if(user) 
                return NextResponse.json({error: ERRORS.PHONE_EXIST.message},  {status: ERRORS.PHONE_EXIST.status})

            await prisma.user.update({
                where: { id: userSession.id },
                data: { phone: validation.data.phone }
            })
            return NextResponse.json({message: "Teléfono actualizado correctamente"})
        }
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
};
