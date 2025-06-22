import { Router } from "express";
import {
  deleteMessageForSender,
  uploadImage,
  viewImage,
} from "../controllers/message.controller";
import {
  isUserAccountDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import {
  isMessageAnImage,
  isMessageDeletedForOthers,
  isMessageDeletedForSender,
  isMessageExisted,
} from "../middlewares/message.middleware";

const router = Router();

router.post(
  "/upload_image",
  isUserAuthenticated,
  isUserAccountDeleted,
  upload.single("image"),
  uploadImage
);

router.get(
  "/view_image/:message_id",
  isUserAuthenticated,
  isUserAccountDeleted,
  isMessageExisted,
  isMessageDeletedForSender,
  isMessageDeletedForOthers,
  isMessageAnImage,
  viewImage
);

router.delete(
  "/delete_message_for_sender/:message_id",
  isUserAuthenticated,
  isUserAccountDeleted,
  isMessageExisted,
  isMessageDeletedForSender,
  isMessageDeletedForOthers,
  deleteMessageForSender
);

export default router;
