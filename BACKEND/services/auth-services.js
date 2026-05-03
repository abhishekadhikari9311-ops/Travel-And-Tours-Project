import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
export const generateJwtToken = async (payload) => {
  try {
    const token = jwt.sign(
      {
        id: payload.id,
        fullName: payload.fullName,
        email: payload.email,
        role: payload.role,
        isApproved: payload.isApproved,
        isEmailVerified: payload.isEmailVerified,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate JWT token");
  }
};

export const generateRandomToken = async () => {
  try {
    const randomToken = crypto.randomBytes(32).toString("hex");
    return randomToken;
  } catch (error) {
    console.error("Error generating random token:", error);
    throw new Error("Failed to generate random token");
  }
};
