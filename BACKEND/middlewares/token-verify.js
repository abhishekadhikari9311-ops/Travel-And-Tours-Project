import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const tokenWithoutBearer = token.replace("Bearer", "").trim();
    console.log("Token without Bearer:", tokenWithoutBearer);

    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    req.user = decoded;
    console.log("User from token:", req.user);

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Failed to verify token");
  }
};
