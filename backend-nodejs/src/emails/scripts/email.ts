import nodemailer from "nodemailer";
import { readFile } from "../../functions/server_file_system";
import path from "path";
import { sendEmailInterface } from "../../interfaces/email_script.interface";

const sendEmail = async ({
  email,
  subject,
  link,
  is_for_activate_account,
}: sendEmailInterface) => {
  const activateAccountTemplatePath = path.join(
    __dirname,
    "../templates/activate_account.html"
  );
  const forgotPasswordTemplatePath = path.join(
    __dirname,
    "../templates/forgot_password.html"
  );
  try {
    const template = await readFile(
      is_for_activate_account
        ? activateAccountTemplatePath
        : forgotPasswordTemplatePath
    );
    const html = template.replace("{{link}}", link);
    await emailConfigurations(email, subject, html);
  } catch (error) {
    return error;
  }
};

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

export { sendEmail };
