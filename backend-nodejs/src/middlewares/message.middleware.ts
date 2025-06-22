import { Request, Response, NextFunction } from "express";
import { Message } from "../models/message.model";
import { isObjectIdValid } from "../functions/general";
import { messageDocumentInterface } from "../interfaces/documents/message.document.interface";
import { checkFileExistence } from "../functions/server_file_system";
import path from "path";

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

const isMessageDeletedForSender = async (
  request: Request,
  respone: Response,
  next: NextFunction
) => {
  const body: messageDocumentInterface = request.body;

  if (body.message!.deleted_for_sender_at)
    return respone.status(403).json({
      result: "message_deleted_for_others",
    });

  next();
};

const isMessageDeletedForOthers = async (
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

const isMessageAnImage = async (
  request: Request,
  respone: Response,
  next: NextFunction
) => {
  const body: messageDocumentInterface = request.body;

  if (body.message!.is_text)
    return respone.status(406).json({
      result: "not_a_text",
    });

  if (
    !(await checkFileExistence(
      path.join(
        __dirname,
        `../conversations/${body.message?.conversation_id}/${body.message?.content}`
      )
    ))
  )
    return respone.status(404).json({
      result: "image_not_found",
    });
  next();
};
export {
  isMessageExisted,
  isMessageDeletedForSender,
  isMessageDeletedForOthers,
  isMessageAnImage,
};
