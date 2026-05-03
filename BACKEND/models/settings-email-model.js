import mongoose from "mongoose";

const settingsEmailSchema = new mongoose.Schema({
  smtpHost: {
    type: String,
    required: true,
  },
  smtpPort: {
    type: Number,
    default: 587,
  },
  smtpSecure: {
    type: Boolean,
    default: false,
  },
  auth: {
    smtpUser: {
      type: String,
      required: true,
    },
    smtpPass: {
      type: String,
      required: true,
    },
  },
});

const SettingsEmail = mongoose.model("SettingsEmail", settingsEmailSchema);

export default SettingsEmail;
