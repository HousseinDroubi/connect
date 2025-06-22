import { Request, Response, NextFunction } from "express";
import { Conversation } from "../models/conversation.model";
import { isObjectIdValid } from "../functions/general";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";

const isConversationExisted = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { conversation_id } = request.params;

  if (!conversation_id || !isObjectIdValid(conversation_id))
    return response.status(400).json({
      result: "conversation_id_is_invalid",
    });

  const conversation = await Conversation.findById(conversation_id);
  if (!conversation)
    return response.status(404).json({
      result: "conversation_not_found",
    });

  request.body.conversation = conversation;
  next();
};

const isUserAuthorizedToAccessConversation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: conversationDocumentInterface & userDocumentInterface =
    request.body;

  const is_user_in_conversation =
    body.conversation!.between === null
      ? true
      : body.conversation!.between!.find(
          (user_id) => String(user_id) === String(body.user!._id)
        );

  if (!is_user_in_conversation) {
    return response.status(401).json({
      result: "user_not_in_conversation",
    });
  }
  next();
};

export { isConversationExisted, isUserAuthorizedToAccessConversation };
