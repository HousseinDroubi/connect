import { Router } from "express";
import {
  deleteConversation,
  getConversationMessages,
} from "../controllers/conversation.controller";
import {
  isUserAccountDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import {
  isConversationExisted,
  isUserAuthorizedToAccessConversation,
} from "../middlewares/conversation.middleware";

const router = Router();

router.get(
  "/get_conversation_messages/:conversation_id",
  isUserAuthenticated,
  isUserAccountDeleted,
  isConversationExisted,
  isUserAuthorizedToAccessConversation,
  getConversationMessages
);

router.delete("/delete_conversation/:conversation_id", deleteConversation);

export default router;
