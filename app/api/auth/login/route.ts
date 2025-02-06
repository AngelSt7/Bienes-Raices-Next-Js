import { prisma } from "@/src/lib/prisma";
import { UserExistNoAuth } from "@/src/services/api/UserExistNoAuth";
import { checkPassword } from "@/src/utils/backend/authUtils";
import { dataSendEmail } from "@/src/utils/backend/sendEmails";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json()

        const userExist = await UserExistNoAuth(email)
        if (userExist instanceof NextResponse) {
            return userExist; 
        }

        if (!userExist.confirmed) {
            const tokenExist = await prisma.token.findFirst({ where: { userId: userExist.id } });
            await dataSendEmail(userExist, tokenExist!, true);
            const error = new Error("La cuenta no ha sido confirmada, hemos enviado un nuevo token para confirmar tu cuenta a tu email");
            return NextResponse.json({ error: error.message }, { status: 401 })
        }

        const isPasswordCorrect =  await checkPassword(password, userExist.password!)

        if (!isPasswordCorrect) {
            const error = new Error("Password Incorrecto")
            return NextResponse.json({ error: error.message }, { status: 401 })
        }

        return NextResponse.json({message: `Bienvenido, ${userExist.name} ${userExist.lastname}`})

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}