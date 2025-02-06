import { transporter } from "../config/nodeMailer"

type AuthEmailType = { email: string, name: string, token: string}

export class AuthEmail {
    static sendConfirmationEmail = async (data: AuthEmailType) => {
        await transporter.sendMail({
            from: 'Store Games <admin@storeGames.com>',
            to: data.email,
            subject: "Store Games - Confirma tu cuenta",
            text: "Store Games - Confirma tu cuenta",
            html: ` <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #444; text-align: center;">¡Bienvenido a Store Games, ${data.name}!</h2>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Has creado tu cuenta en <strong>Store Games</strong>, ¡ya casi está todo listo! Solo debes confirmar tu cuenta para poder comenzar a usarla.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Para confirmar tu cuenta, visita el siguiente enlace:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${data.token}" 
                            style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
                            Confirmar Cuenta
                        </a>
                    </div>
                    <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
                        ${data.token}
                    </div>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        <strong>Nota:</strong> Este token expira en 10 minutos.
                    </p>
                    <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
                        Si no has solicitado esta cuenta, puedes ignorar este mensaje.
                    </p>
                </div>
            </div>

            `
        })
    }

    static sendPasswordResetToken = async (data: AuthEmailType) => {
        await transporter.sendMail({
            from: 'StarLigt Games <admin@starlightgames.com>',
            to: data.email,
            subject: "StarLigt Games - Confirma tu cuenta",
            text: "StarLigt Games - Recupera tu acceso",
            html: ` <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #444; text-align: center;">¡Hola, ${data.name}!</h2>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Has solicitado restablecer tu password en <strong>StarLigt Games</strong>.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Para restablecer tu contraseña, visita el siguiente enlace:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.FRONTEND_URL}/auth/reset-password" 
                            style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
                            Restablecer Password
                        </a>
                    </div>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Ingresa el código para restablecer tu password:
                    </p>
                    <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
                        ${data.token}
                    </div>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        <strong>Nota:</strong> Este token expira en 10 minutos.
                    </p>
                    <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
                        Si no has solicitado esta cuenta, puedes ignorar este mensaje.
                    </p>
                </div>
            </div>
            `
        })
    }
}