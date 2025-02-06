import { Token, User } from "@prisma/client";
import { handleTokenAndEmail } from "./handleTokenAndEmail";

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
