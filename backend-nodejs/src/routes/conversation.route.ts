import { Router } from "express";
import {
  deleteConversation,
  getConversationMessages,
} from "../controllers/conversation.controller";
import {
  isUserAccountDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import { isUserAuthorizedToAccessConversation } from "../middlewares/conversation.middleware";
import { getConversationMessagesValidationMiddleware } from "../middlewares/validations/conversation.validation.middleware";

const router = Router();

router.get(
  "/get_conversation_messages/:conversation_id",
  isUserAuthenticated,
  isUserAccountDeleted,
  getConversationMessagesValidationMiddleware,
  isUserAuthorizedToAccessConversation,
  getConversationMessages
);

router.delete("/delete_conversation/:conversation_id", deleteConversation);

export default router;
