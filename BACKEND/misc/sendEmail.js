import { text } from "express";
import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html, settings }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: settings.smtpSecure,
      auth: {
        user: settings.auth.smtpUser,
        pass: settings.auth.smtpPass,
      },
    });

    const mailOptions = {
      from: settings.auth.smtpUser,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
export default sendEmail;
