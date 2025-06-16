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
    const file_name = `${file.fieldname}-${uniqueSuffix}${ext}`;
    cb(null, file_name);
    req.body.file_name = file_name;
  },
});

export const upload = multer({ storage });
