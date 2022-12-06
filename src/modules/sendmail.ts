const nodemailer = require("nodemailer");
export const sendMail = async (mailTo: any, subject: any, template: any) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: '"Pinnel the 🐧" <PinnelTheRealPenguin@chewbacca.com>', // sender address
    to: mailTo, // list of receivers
    subject: subject, // Subject line
    text: "", // plain text body
    html: template, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
