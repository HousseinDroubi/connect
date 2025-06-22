import { Request, Response, NextFunction } from "express";
import { Conversation } from "../models/conversation.model";
import { isObjectIdValid } from "../functions/general";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import User from "../models/user.model";

const isConversationExisted = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { pin } = request.params;
  const body: userDocumentInterface = request.body;
  let conversation;
  if (pin === "broadcast") {
    conversation = await Conversation.findOne({ between: null });
  } else {
    const other_user = await User.findOne({ pin });
    if (!other_user)
      return response.status(404).json({
        result: "user_not_found",
      });
    conversation = await Conversation.findOne({ between: other_user._id });
    if (!conversation) {
      conversation = await Conversation.create({
        between: [other_user._id, body.user!._id],
        last_message: null,
      });
      return response.status(201).json({
        result: "conversation_added",
        conversation_id: conversation._id,
      });
    }
  }

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
