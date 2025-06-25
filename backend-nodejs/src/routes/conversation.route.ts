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
import {
  getConversationMessagesValidationMiddleware,
  deleteConversationValidationMiddleware,
} from "../middlewares/validations/conversation.validation.middleware";

const router = Router();

router.get(
  "/get_conversation_messages/:pin",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  getConversationMessagesValidationMiddleware,
  isUserAuthorizedToAccessConversation,
  getConversationMessages
);

router.delete(
  "/delete_conversation/:pin",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  deleteConversationValidationMiddleware,
  isConversationExisted,
  isUserAuthorizedToAccessConversation,
  deleteConversation
);

export default router;
