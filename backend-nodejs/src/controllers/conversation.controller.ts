import { Request, Response } from "express";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { Message } from "../models/message.model";
import { Conversation } from "../models/conversation.model";
import User from "../models/user.model";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";
import { getConversationMessagesInterface } from "../interfaces/controllers/conversation.controller.interfaces";

const getConversationMessages = async (
  request: Request,
  response: Response
) => {
  const body: getConversationMessagesInterface = request.body;

  if (!body.user || !body.conversation)
    throw new Error("Neitihr user, nor body is not in body");

  const messages = await Message.find({
    $or: [
      { sender: body.user._id },
      { receiver: body.user._id },
      { receiver: null },
    ],
    conversation_id: body.conversation._id,
    deleted_for_others_at: null,
    deleted_for: { $nin: [body.user._id] },
  });

  return response.status(200).json({
    result: "got_messages",
    messages,
  });
};

const deleteConversation = async (request: Request, response: Response) => {
  const body: userDocumentInterface & conversationDocumentInterface =
    request.body;
  if (!body.conversation || !body.user)
    throw new Error("Neither conversation nor user in body");

  if (
    body.conversation.deleted_for.some(
      (_id) => String(_id) === String(body.user!._id)
    )
  )
    return response.status(403).json({
      result: "already_deleted",
    });

  body.conversation.deleted_for.push(body.user._id);
  await body.conversation.save();
};

export { deleteConversation, getConversationMessages };
