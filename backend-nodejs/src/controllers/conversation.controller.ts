import { Request, Response } from "express";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { Message } from "../models/message.model";
import { Conversation } from "../models/conversation.model";
import User from "../models/user.model";
import { messageDocumentInterface } from "../interfaces/documents/message.document.interface";

const getConversationMessages = async (
  request: Request,
  response: Response
) => {
  const { pin } = request.params;
  const body: userDocumentInterface = request.body;
  let other_user = null;
  let conversation = null;

  // Checking other user
  if (pin !== "broadcast") {
    other_user = await User.findOne({ pin: Number(pin) });

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
  }

  // Get conversation or create new one
  if (pin === "broadcast")
    conversation = await Conversation.findOne({ between: null });
  else {
    conversation = await Conversation.findOne({
      between: { $all: [body.user!._id, other_user!._id] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        between: [body.user!._id, other_user!._id],
        last_message: null,
      });
    }
  }

  if (conversation!.between !== null)
    if (
      !conversation!.between.some(
        (_id) => String(body.user!._id) === String(_id)
      )
    )
      return response.status(401).json({
        result: "user_not_in_conversation",
      });

  const messages = await Message.find({
    $or: [
      { sender: body.user!._id },
      { receiver: body.user!._id },
      { receiver: null },
    ],
    conversation_id: conversation!._id,
    deleted_for_others_at: null,
    deleted_for: { $nin: [body.user!._id] },
  });

  const data_respones: any = {
    result: "got_messages",
    conversation_id: conversation!._id,
    messages,
  };

  if (pin !== "broadcast") {
    data_respones.recipient = {
      _id: other_user!._id,
      profile_url: `http://${process.env.DOMAIN}:${process.env.PORT}/${
        other_user!.profile_url
      }`,
      username: other_user!.username,
      is_online: other_user!.is_online,
    };
  }

  return response.status(200).json(data_respones);
};

const deleteConversation = async (request: Request, response: Response) => {
  const { pin } = request.params;
  const body: userDocumentInterface = request.body;

  let other_user = await User.findOne({ pin: Number(pin) });

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

  const conversation = await Conversation.findOne({
    between: { $all: [body.user!._id, other_user!._id] },
  });

  if (!conversation)
    return response.status(404).json({
      result: "conversation_not_found",
    });

  if (
    conversation.deleted_for.some(
      (_id) => String(_id) === String(body.user!._id)
    )
  )
    return response.status(403).json({
      result: "already_deleted",
    });

  conversation.deleted_for.push(body.user!._id);
  await conversation.save();

  return response.status(200).json({
    result: "deleted",
  });
};

export { deleteConversation, getConversationMessages };
