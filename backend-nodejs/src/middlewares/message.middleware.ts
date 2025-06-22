import { Request, Response, NextFunction } from "express";
import { Message } from "../models/message.model";
import { isObjectIdValid } from "../functions/general";

// This middleware takes message_id from token and find whethere it exists in DB or not
const isMessageExisted = async (
  request: Request,
  respone: Response,
  next: NextFunction
) => {
  const { message_id } = request.params;
  if (!message_id || !isObjectIdValid(message_id))
    return respone.status(400).json({
      result: "message_id_required",
    });

  const message = await Message.findById(message_id);
  if (!message) {
    return respone.status(404).json({
      result: "message_not_found",
    });
  }
  next();
};

export { isMessageExisted };
