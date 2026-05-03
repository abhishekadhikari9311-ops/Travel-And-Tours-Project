// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     isApproved: {
//       type: Boolean,
//       default: false,
//     },
//     emailVerificationToken: {
//       type: String,
//     },
//     emailVerificationTokenExpires: {
//       type: Date,
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     passwordResetToken: {
//       type: String,
//     },
//     passwordResetTokenExpires: {
//       type: Date,
//     },
//   },
//   { timestamps: true },
// );

// const User = mongoose.model("User", userSchema);

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // 🔐 Password (optional for Google users)
    password: {
      type: String,
      required: function () {
        return !this.googleId; // required only if not Google login
      },
    },

    // 🔵 Google OAuth fields
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null values without breaking unique constraint
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isApproved: {
      type: Boolean,
      default: true, // Google users are usually auto-approved
    },

    // 📧 Email verification (mostly for normal signup)
    emailVerificationToken: String,
    emailVerificationTokenExpires: Date,

    isEmailVerified: {
      type: Boolean,
      default: function () {
        return this.authProvider === "google"; // Google users are auto verified
      },
    },

    // 🔁 Password reset (for local users only)
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    timestamps: true,
  },
);

// Index for faster lookup
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

const User = mongoose.model("User", userSchema);

export default User;
