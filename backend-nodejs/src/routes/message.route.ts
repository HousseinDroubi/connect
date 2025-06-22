import { Router } from "express";
import { uploadImage } from "../controllers/message.controller";
import {
  isUserAccountDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post(
  "/upload_image",
  isUserAuthenticated,
  isUserAccountDeleted,
  upload.single("image"),
  uploadImage
);
router.get("/view_image/:message_id", uploadImage);

export default router;
