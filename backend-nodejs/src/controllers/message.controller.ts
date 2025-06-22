import { Request, Response } from "express";
import { uploadImageBodyInterface } from "../interfaces/controllers/message.controller.interfaces";

const uploadImage = (request: Request, response: Response) => {
  const body: uploadImageBodyInterface = request.body;
  return response.status(200).json({
    result: "image_uploaded",
    file_name: body.file_name,
  });
};

const viewImage = (request: Request, response: Response) => {
  // viewImage
};

export { uploadImage, viewImage };
