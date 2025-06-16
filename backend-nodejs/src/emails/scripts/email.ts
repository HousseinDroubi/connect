import nodemailer from "nodemailer";

const emailConfigurations = async (
  email: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: html,
  });
};
