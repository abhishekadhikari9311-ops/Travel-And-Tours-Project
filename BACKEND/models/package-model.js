import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    destinationImage: {
      type: String,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    packageTime: {
      type: String,
      required: true,
    },
    packagePrice: {
      type: String,
      required: true,
    },
    packageDescription: {
      type: String,
      required: true,
    },
    packageHighlights: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

const Package = mongoose.model("Package", packageSchema);

export default Package;