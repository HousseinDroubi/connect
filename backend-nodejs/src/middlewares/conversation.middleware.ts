import { Request, Response, NextFunction } from "express";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";

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

export { isUserAuthorizedToAccessConversation };
