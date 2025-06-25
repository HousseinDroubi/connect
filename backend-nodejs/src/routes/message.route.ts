import { Router } from "express";
import {
  deleteMessage,
  uploadImage,
  viewImage,
} from "../controllers/message.controller";
import {
  isUserAccountUnverifiedOrDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import {
  isMessageAnImage,
  isMessageDeletedForOthers,
  haveUserDeletedMessage,
  isMessageExisted,
} from "../middlewares/message.middleware";

const router = Router();

router.post(
  "/upload_image",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  upload.single("image"),
  uploadImage
);

router.get(
  "/view_image/:message_id",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  isMessageExisted,
  haveUserDeletedMessage,
  isMessageDeletedForOthers,
  isMessageAnImage,
  viewImage
);

router.delete(
  "/delete_message_for_sender/:message_id",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  isMessageExisted,
  haveUserDeletedMessage,
  isMessageDeletedForOthers,
  deleteMessage
);

export default router;
