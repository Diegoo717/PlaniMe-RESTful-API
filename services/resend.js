require("dotenv").config;
const { Resend } = require("resend");

function resend(email, fullName, date, time, service, code) {
  const resend = new Resend(process.env.API_KEY_RESEND);

  (async function () {
    const { data, error } = await resend.emails.send({
      from: "PlaniMe <soport@" + process.env.DOMAIN + ">",
      to: [email],
      subject: "",
      html: ``,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
}

module.exports = { resend };
