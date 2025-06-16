import multer from "multer";
import path from "path";
import { createMainFolders } from "../functions/server_file_system";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await createMainFolders();
    cb(null, path.join(__dirname, "../temp"));
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
