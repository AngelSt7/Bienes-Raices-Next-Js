import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}

console.log(process.env.SMTP_HOST, process.env.SMTP_PORT);

export const transporter = nodemailer.createTransport(config);

