import { prisma } from "@/src/config/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const UserExistNoAuth = async (email: User['email'])  => {
    const userExist = await prisma.user.findUnique({ where: { email } })

    if (!userExist) {
        const error = new Error('El usuario no existe');
        return NextResponse.json({ error: error.message }, { status: 409 })
    }

    if (userExist.authProvider !== 'manual') {
        const error = new Error(`Esta accion no se puede realizar al tener una cuenta con el proveedor de ${userExist.authProvider}`);
        return NextResponse.json({ error: error.message }, { status: 409 })
    }

    return userExist 
}   