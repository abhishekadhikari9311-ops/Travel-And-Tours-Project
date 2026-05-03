import multer from "multer";

import { cloudinary } from "../utils/cloudinary.js";

import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tours_travels",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });
// console.log("uploads:", upload);

export default upload;
