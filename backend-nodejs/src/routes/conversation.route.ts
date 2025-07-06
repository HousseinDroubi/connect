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
  getConversationMessagesValidationMiddleware,
  deleteConversationValidationMiddleware,
} from "../middlewares/validations/conversation.validation.middleware";

const router = Router();

router.get(
  "/get_messages/:pin",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  getConversationMessagesValidationMiddleware,
  getConversationMessages
);

router.delete(
  "/delete_conversation/:pin",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  deleteConversationValidationMiddleware,
  deleteConversation
);

export default router;
