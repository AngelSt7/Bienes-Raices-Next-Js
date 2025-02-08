import { Token, User } from "@prisma/client";
import { generateToken } from "./authUtils";
import { prisma } from "@/src/config/prisma";
import { AuthEmail } from "@/src/class/AuthEmail";

type TokenHandlerData = {
    id: Token['id'],
    name: User['name'],
    email: User['email'],
    tokenExist: Token,
    type: Boolean
}

export const handleTokenAndEmail = async (dataToken: TokenHandlerData) => {
    const { id, name, email, tokenExist, type } = dataToken

    const tokenValue = generateToken();
    const limitTime = new Date();
    const expiresAt = new Date(limitTime.getTime() + 10 * 60 * 1000);

    if (tokenExist) {
        await prisma.token.update({
            where: { id: tokenExist.id },
            data: { token: +tokenValue, expiresAt }
        })
    } else {
        await prisma.token.create({
            data: { userId: id, token: +tokenValue, expiresAt }
        })
    }

    const data = {
        email,
        name,
        token: tokenValue,
    };

    (type)
        ? AuthEmail.sendConfirmationEmail(data)
        : AuthEmail.sendPasswordResetToken(data)
};


export const dataSendEmail = async (user : User, tokenExist : Token, type : boolean) => {
    const dataRequired = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: type,
        tokenExist
    };
    await handleTokenAndEmail(dataRequired);
}
