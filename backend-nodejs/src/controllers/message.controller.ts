import { Request, Response } from "express";
import { uploadImageBodyInterface } from "../interfaces/controllers/message.controller.interfaces";
import { messageDocumentInterface } from "../interfaces/documents/message.document.interface";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import path from "path";

const uploadImage = (request: Request, response: Response) => {
  const body: uploadImageBodyInterface = request.body;
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
      body.user._id !== body.message.sender ||
      body.user._id !== body.message.receiver
    )
      return response.status(401).json({
        result: "not_allowed_to_view_image",
      });

  const image_path = path.join(
    __dirname,
    `../${body.message.conversation_id}/${body.message.content}`
  );
  return response.send(image_path);
};

export { uploadImage, viewImage };
