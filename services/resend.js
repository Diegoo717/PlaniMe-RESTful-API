require("dotenv").config;
const { Resend } = require("resend");

function resend(email, verificationCode, userName) {
  const resend = new Resend(process.env.API_KEY_RESEND);

  (async function () {
    const { data, error } = await resend.emails.send({
      from: "PlaniMe <soport@" + process.env.DOMAIN + ">",
      to: [email],
      subject: "Asistencia PlaniMe",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h1 style="color: #2e7d32; text-align: center;">🔑 Recuperación de Contraseña</h1>
  
  <p>Hola <strong>${userName}</strong>, hemos recibido una solicitud para restablecer tu contraseña.</p>
  
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
    <p style="margin: 5px 0; font-size: 18px;">Tu código de verificación es:</p>
    <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #2e7d32;">${verificationCode}</p>
    <p style="font-size: 14px; color: #666;">(Válido por 15 minutos)</p>
  </div>
  
  <p style="text-align: center;">Ingresa este código en nuestra plataforma para continuar con el proceso.</p>
  
  <p style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
    <strong>PlaniMe</strong><br>
    🔗 <a href="http://85.239.244.71/" style="color: #1565c0;">Visita nuestro sitio</a>
  </div>
</div>`,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
}

module.exports = { resend };
