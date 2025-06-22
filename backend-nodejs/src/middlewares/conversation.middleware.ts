import { Request, Response, NextFunction } from "express";
import { Conversation } from "../models/conversation.model";
import { isObjectIdValid } from "../functions/general";

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

  next();
};

export { isConversationExisted };
