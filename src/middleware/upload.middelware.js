import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { messageObject } from "../config/constant.js";
const {user}=messageObject;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the upload directory relative to the project root
const uploadDir = path.join(__dirname, "../uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
}).single("image");

export default upload;
