import { prisma } from "@/src/config/prisma"
import { authTokenSchema } from "@/src/schema/authSchema"
import { ERRORS } from "@/src/utils/backend/errors/errors"
import { validateData } from "@/src/utils/backend/validations/validateData"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(()=>({}))

        const validation = validateData(authTokenSchema, body)
        if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 400 });

        const { token } = validation.data
            
        const tokenExist = await prisma.token.findFirst({where: {token: parseInt(token)}})

        if (!tokenExist) 
            return NextResponse.json({ error: ERRORS.NOT_EXIST_TOKEN.message }, {status: ERRORS.NOT_EXIST_TOKEN.status});
    
        if (new Date() > new Date(tokenExist.expiresAt)) {
            await prisma.token.delete({ where: { id: tokenExist.id } });
            return NextResponse.json({ error: ERRORS.EXPIRED_TOKEN.message }, {status: ERRORS.EXPIRED_TOKEN.status});
        }

        return NextResponse.json({message: "Token confirmado, ingrese su nueva contraseña"})
    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
}