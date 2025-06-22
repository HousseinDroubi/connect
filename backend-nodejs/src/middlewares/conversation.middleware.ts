import { Request, Response, NextFunction } from "express";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { Conversation } from "../models/conversation.model";
import User from "../models/user.model";

const isConversationExisted = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { pin } = request.params;
  const body: userDocumentInterface = request.body;

  const other_user = await User.findOne({ pin });
  if (!other_user)
    return response.status(404).json({
      result: "user_not_found",
    });

  const conversation = await Conversation.create({
    between: [other_user._id, body.user!._id],
    last_message: null,
  });

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

  if (body.conversation!.between === null)
    return response.status(403).json({
      result: "method_not_allowed",
    });

  if (
    !body.conversation!.between.some(
      (_id) => String(body.user!._id) === String(_id)
    )
  )
    return response.status(401).json({
      result: "user_not_in_conversation",
    });

  next();
};

export { isUserAuthorizedToAccessConversation, isConversationExisted };
