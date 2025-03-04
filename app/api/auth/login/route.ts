import { prisma } from "@/src/config/prisma";
import { UserExistNoAuth } from "@/src/utils/backend/validations/UserExistNoAuth";
import { checkPassword } from "@/src/utils/backend/authUtils";
import { dataSendEmail } from "@/src/utils/backend/emailUtils";
import { NextRequest, NextResponse } from "next/server";
import { validateData } from "@/src/utils/backend/validations/validateData";
import { authLoginSchema } from "@/src/schema/authSchema";
import { ERRORS } from "@/src/utils/backend/errors/errors";

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
            return NextResponse.json({ error: ERRORS.ACCOUNT_NOT_CONFIRMED.message }, { status: ERRORS.ACCOUNT_NOT_CONFIRMED.status })
        }

        const isPasswordCorrect = await checkPassword(password, userExist.password!)

        if (!isPasswordCorrect) 
            return NextResponse.json({ error: ERRORS.INCORRECT_PASSWORD.message }, { status: ERRORS.INCORRECT_PASSWORD.status })

        return NextResponse.json({ id: userExist.id, name: `${userExist.name} ${userExist.lastname}`, email: userExist.email });

    } catch {
        return NextResponse.json({ error: ERRORS.SERVER_ERROR.message }, { status: ERRORS.SERVER_ERROR.status });
    }
}