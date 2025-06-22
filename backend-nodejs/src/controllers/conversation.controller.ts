import { Request, Response } from "express";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { Message } from "../models/message.model";
import { Conversation } from "../models/conversation.model";
import User from "../models/user.model";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";

const getConversationMessages = async (
  request: Request,
  response: Response
) => {
  const { pin } = request.params;
  const body: userDocumentInterface = request.body;

  if (!body.user) throw new Error("User is not in body");

  let conversation;

  if (pin === "broadcast") {
    conversation = await Conversation.findOne({ between: null });
  } else {
    const other_user = await User.findOne({ pin });
    if (!other_user)
      return response.status(404).json({
        result: "user_not_found",
      });
    conversation = await Conversation.findOne({
      between: { $all: [body.user._id, other_user._id] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        between: [other_user._id, body.user!._id],
        last_message: null,
      });
      return response.status(201).json({
        result: "conversation_added",
        conversation_id: conversation._id,
      });
    } else {
      conversation.deleted_for = conversation.deleted_for.filter(
        (user_id) => String(user_id) !== String(body.user!._id)
      );
      await conversation.save();
    }
  }

  if (!conversation) throw new Error("Conversation is not existed");

  const messages = await Message.find({
    $or: [
      { sender: body.user._id },
      { receiver: body.user._id },
      { receiver: null },
    ],
    conversation_id: conversation._id,
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
