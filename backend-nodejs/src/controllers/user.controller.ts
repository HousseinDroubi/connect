import { Request, Response } from "express";
import User from "../models/user.model";

const viewOtherUserProfile = async (request: Request, response: Response) => {
  const other_user_id: string = request.params.user_id;

  const other_user = await User.findById(other_user_id);

  if (!other_user)
    return response.status(400).json({
      result: "user_not_found",
    });

  return response.status(200).json({
    username: other_user.username,
    pin: other_user.pin,
    joined_at: other_user.created_at,
    profile_url: `http://${process.env.DOAMIN}:${process.env.PORT}/${other_user.profile_url}`,
  });
};

export { viewOtherUserProfile };
