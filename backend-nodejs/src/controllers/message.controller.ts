import { Request, Response } from "express";
import { uploadImageBodyInterface } from "../interfaces/controllers/message.controller.interfaces";

const uploadImage = (request: Request, response: Response) => {
  const body: uploadImageBodyInterface = request.body;
};

const viewImage = (request: Request, response: Response) => {
  // viewImage
};

export { uploadImage, viewImage };
