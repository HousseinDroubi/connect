import { Request, Response, NextFunction } from "express";
import { Message } from "../models/message.model";
import { isObjectIdValid } from "../functions/general";
import { messageDocumentInterface } from "../interfaces/documents/message.document.interface";

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

  request.body.message = message;
  next();
};

const isMessageDeleted = async (
  request: Request,
  respone: Response,
  next: NextFunction
) => {
  const body: messageDocumentInterface = request.body;

  if (body.message!.deleted_for_others_at)
    return respone.status(403).json({
      result: "message_deleted_for_others",
    });

  next();
};
export { isMessageExisted, isMessageDeleted };
