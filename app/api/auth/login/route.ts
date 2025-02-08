import { prisma } from "@/src/config/prisma";
import { UserExistNoAuth } from "@/src/utils/backend/validations/UserExistNoAuth";
import { checkPassword } from "@/src/utils/backend/authUtils";
import { dataSendEmail } from "@/src/utils/backend/emailUtils";
import { NextRequest, NextResponse } from "next/server";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { authLoginSchema } from "@/src/schema/authSchema";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json().catch(() => ({}))

        const validations = validateData(authLoginSchema, body)
        if (!validations.success) return NextResponse.json({ errors: validations.errors }, { status: 400 })

        const { email, password } = validations.data
        const userExist = await UserExistNoAuth(email)
        if (userExist instanceof NextResponse) {
            return userExist;
        }

        if (!userExist.confirmed) {
            const tokenExist = await prisma.token.findFirst({ where: { userId: userExist.id } });
            await dataSendEmail(userExist, tokenExist!, true);
            const error = new Error("La cuenta no ha sido confirmada, hemos enviado un nuevo token a tu email para confirmar tu cuenta");
            return NextResponse.json({ error: error.message }, { status: 401 })
        }

        const isPasswordCorrect = await checkPassword(password, userExist.password!)

        if (!isPasswordCorrect) {
            const error = new Error("Contraseña incorrecta")
            return NextResponse.json({ error: error.message }, { status: 401 })
        }

        return NextResponse.json({ id: userExist.id, name: `${userExist.name} ${userExist.lastname}`, email: userExist.email });

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}