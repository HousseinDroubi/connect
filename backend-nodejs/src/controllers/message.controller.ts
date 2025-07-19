import { Request, Response } from "express";
import { uploadImageBodyInterface } from "../interfaces/controllers/message.controller.interfaces";
import { messageDocumentInterface } from "../interfaces/documents/message.document.interface";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import path from "path";

const uploadImage = (request: Request, response: Response) => {
  const body: uploadImageBodyInterface = request.body;
  if (!body.file_name)
    return response.status(400).json({
      result: "missing_image",
    });

  return response.status(200).json({
    result: "image_uploaded",
    file_name: body.file_name,
  });
};

const viewImage = (request: Request, response: Response) => {
  const body: messageDocumentInterface & userDocumentInterface = request.body;
  if (!body.message || !body.user)
    throw new Error("Neither message nor user in the body");

  if (body.message.receiver !== null)
    if (
      !(
        String(body.user._id) === String(body.message.sender) ||
        String(body.user._id) === String(body.message.receiver)
      )
    )
      return response.status(401).json({
        result: "not_allowed_to_view_image",
      });

  const image_path = path.join(
    __dirname,
    `../conversations/${body.message.conversation_id}/${body.message.content}`
  );
  return response.sendFile(image_path);
};

const deleteMessage = async (request: Request, response: Response) => {
  const body: userDocumentInterface & messageDocumentInterface = request.body;
  if (!body.message || !body.user)
    throw new Error("Neither message nor user in the body");

  body.message.deleted_for.push(body.user._id);
  await body.message.save();

  return response.status(200).json({
    result: "message_deleted",
    message_id: String(body.message._id),
    message_conversation_id: String(body.message.conversation_id),
  });
};

export { uploadImage, viewImage, deleteMessage };
