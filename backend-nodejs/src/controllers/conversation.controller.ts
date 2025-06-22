import { Request, Response } from "express";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { Message } from "../models/message.model";
import { Conversation } from "../models/conversation.model";
import User from "../models/user.model";

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

const deleteConversation = (request: Request, response: Response) => {
  // deleteConversation
};

export { deleteConversation, getConversationMessages };
