import { generateRandomToken } from "../services/auth-services.js";
import sendEmail from "./sendEmail.js";

const emailVerification = async (newUser, settings) => {
  try {
    const emailVerificationToken = await generateRandomToken();
    console.log("Generated Email Verification Token:", emailVerificationToken);

    // Send email verification logic here using the generated token

    const emailVerificationLink = `http://localhost:5173/verify-email/${emailVerificationToken}`;
    console.log("Email Verification Link:", emailVerificationLink);

    const emailVerificationTokenExpires = Date.now() + 3600000; // 1 hour

    // Save the token and its expiration time to the user's record in the database

    newUser.emailVerificationToken = emailVerificationToken;
    newUser.emailVerificationTokenExpires = emailVerificationTokenExpires;
    await newUser.save();

    const html = `
     <h1>EMAIL VERIFICATION</h1>
    <h2>Please click the following link to verify your email: 
     <a href="${emailVerificationLink}" target="_blank">Verify Email</a></h2>
    <p>please note it that this link will expire in 1 hour.</p> `;

    console.log("Email Content:", html);

    await sendEmail({
      to: newUser.email,
      subject: "Email Verification",
      html,
      settings,
    });

    console.log("Email verification sent successfully to:", newUser.email);
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw new Error("Failed to send email verification");
  }
};

export default emailVerification;
