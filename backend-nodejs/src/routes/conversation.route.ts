import { Router } from "express";
import {
  deleteConversation,
  getConversationMessages,
} from "../controllers/conversation.controller";
import {
  isUserAccountUnverifiedOrDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import {
  isConversationExisted,
  isUserAuthorizedToAccessConversation,
} from "../middlewares/conversation.middleware";
import { getConversationMessagesValidationMiddleware } from "../middlewares/validations/conversation.validation.middleware";

const router = Router();

router.get(
  "/get_conversation_messages/:conversation_id",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  getConversationMessagesValidationMiddleware,
  isUserAuthorizedToAccessConversation,
  getConversationMessages
);

router.delete(
  "/delete_conversation/:conversation_id",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  isConversationExisted,
  isUserAuthorizedToAccessConversation,
  deleteConversation
);

export default router;
