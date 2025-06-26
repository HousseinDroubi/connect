import { Request, Response, NextFunction } from "express";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { Conversation } from "../models/conversation.model";
import User from "../models/user.model";
import { checkConversationExistenceBodyInterface } from "../interfaces/middlewares/conversation.middleware.interfaces";

const isConversationExisted = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { pin } = request.params;
  if (!pin) {
    return response.status(400).json({
      result: "pin_required",
    });
  }

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

const checkOtherUserInConversationExistence = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { pin } = request.params;
  if (pin !== "broadcast") {
    const other_user = await User.findOne({ pin: Number(pin) });

    if (!other_user)
      return response.status(404).json({
        result: "other_user_not_found",
      });

    if (!other_user.is_verified)
      return response.status(405).json({ error: "other_user_not_verified" });

    if (other_user.deleted_at)
      return response.status(410).json({
        result: "other_user_account_deleted",
      });
    request.body.other_user = other_user;
  }
  next();
};

const checkConversationExistence = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { pin } = request.params;
  const body: checkConversationExistenceBodyInterface = request.body;

  if ((!body.user || !body.other_user) && pin !== "broadcast")
    throw new Error("Neither user nor other user in body");

  let conversation;
  if (pin === "broadcast")
    conversation = await Conversation.findOne({ between: null });
  else
    conversation = await Conversation.findOne({
      between: { $all: [body.user!._id, body.other_user!._id] },
    });
  request.body.conversation = conversation;
  console.log(request.url);
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

export {
  isUserAuthorizedToAccessConversation,
  isConversationExisted,
  checkOtherUserInConversationExistence,
  checkConversationExistence,
};
