import { Request, Response } from "express";
import User from "../models/user.model";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import dotenv from "dotenv";

dotenv.config();

const viewOtherUserProfile = async (request: Request, response: Response) => {
  const body: userDocumentInterface = request.body;
  const other_user_id: string = request.params.user_id;

  const other_user = await User.findById(other_user_id);

  if (!other_user)
    return response.status(400).json({
      result: "user_not_found",
    });

  if (String(other_user._id) == String(body.user!._id)) {
    return response.status(400).json({
      result: "same_account",
    });
  }

  return response.status(200).json({
    username: other_user.username,
    pin: other_user.pin,
    joined_at: other_user.created_at,
    profile_url: `http://${process.env.DOMAIN}:${process.env.PORT}/${other_user.profile_url}`,
  });
};

export { viewOtherUserProfile };
