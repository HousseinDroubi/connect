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
  return response.send(image_path);
};

const deleteMessageForSender = async (request: Request, response: Response) => {
  const body: userDocumentInterface & messageDocumentInterface = request.body;
  if (!body.message || !body.user)
    throw new Error("Neither message nor user in the body");

  if (body.message.sender !== body.user._id)
    return response.status(405).json({
      result: "method_not_allowed",
    });

  body.message.deleted_for.push(body.user._id);
  await body.message.save();

  return response.status(200).json({
    result: "message_delete_for_sender",
  });
};

export { uploadImage, viewImage, deleteMessageForSender };
