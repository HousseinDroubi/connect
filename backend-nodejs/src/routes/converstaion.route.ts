import { Router } from "express";
import {
  deleteConversation,
  getConversationMessages,
  restoreConversation,
} from "../controllers/conversation.controller";

const router = Router();

router.get(
  "/get_conversation_messages/:conversation_id",
  getConversationMessages
);

router.put("/restore_conversation/:conversation_id", restoreConversation);

router.delete("/delete_conversation/:conversation_id", deleteConversation);

export default router;
