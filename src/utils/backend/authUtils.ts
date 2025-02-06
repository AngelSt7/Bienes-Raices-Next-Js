import bcrypt from "bcrypt"

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export async function checkPassword(password: string, storedHash: string) {
    return await bcrypt.compare(password, storedHash)
}

export const generateToken = () => Math.floor(100000 + Math.random() * 900000).toString()