import { Request, Response } from "express";
import User from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const searchForUsers = async (request: Request, response: Response) => {
  const { content } = request.params;
  const { user_id } = request.body;
  if (!user_id) throw new Error("user id wasn't found");

  let users = await User.find({
    is_verified: true,
    $or: [
      { username: { $regex: content, $options: "i" } },
      { email: { $regex: content, $options: "i" } },
      {
        $expr: {
          $regexMatch: {
            input: { $toString: "$pin" },
            regex: content,
            options: "i",
          },
        },
      },
    ],
  }).select("_id username pin profile_url");

  users.forEach((user) => {
    user.profile_url = `http://${process.env.DOMAIN}:${process.env.PORT}/${user.profile_url}`;
  });

  users = users.filter((user) => String(user._id) !== String(user_id));

  return response.status(200).json({
    users,
  });
};

export { searchForUsers };
