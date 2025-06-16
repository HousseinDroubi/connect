import multer from "multer";
import path from "path";
import fs from "fs";

const createPublicFolder = () => {
  const uploadPath = path.join(__dirname, "../public");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createPublicFolder();
    cb(null, path.join(__dirname, "../public"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({ storage });
