import { Request, Response } from "express";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { conversationDocumentInterface } from "../interfaces/documents/conversation.document.interface";
import { Message } from "../models/message.model";

const getConversationMessages = async (
  request: Request,
  response: Response
) => {
  const body: userDocumentInterface & conversationDocumentInterface =
    request.body;
  if (!body.user || !body.conversation)
    throw new Error("Neither user nor conversation in body");
  const messages = await Message.find({
    $and: [
      {
        $or: [
          { sender: body.user._id },
          { receiver: body.user._id },
          { receiver: null },
        ],
      },
      {
        conversation_id: body.conversation._id,
      },
      {
        deleted_for_others_at: null,
      },
      {
        $or: [
          { deleted_for_sender_at: null },
          {
            $and: [
              { deleted_for_sender_at: { $ne: null } },
              { sender: { $ne: body.user._id } },
            ],
          },
        ],
      },
    ],
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
