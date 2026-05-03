import User from "../models/user-model.js";

const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    console.log("Received email verification token:", token);

    // Find the user with the provided token and check if it's still valid

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Mark the user's email as verified and clear the token fields

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    throw new Error("Failed to verify email");
  }
};

export default verifyEmail;
