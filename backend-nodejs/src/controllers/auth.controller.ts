import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user.model";
import { deleteFile, moveFile } from "../functions/server_file_system";
import path from "path";
import crypto from "crypto";
import {
  createUserAccountBodyInterface,
  deleteUserAccountBodyInterface,
  forgotPasswordBodyInterface,
  updateForgottenPasswordBodytInterface,
  updatePasswordBodyInterface,
  updateProfileBodyInterface,
} from "../interfaces/controllers/auth.controller.interfaces";
import {
  loginResponseInterface,
  updateProfileResponseInterface,
} from "../interfaces/responses/auth.controller.responses.interfaces";
import { sendEmail } from "../emails/scripts/email";
import { Token } from "../models/token.model";
import {
  validateActivateAccount,
  validateCreateAccount,
  validateForgotPassword,
  validateLogin,
  validateUpdateForgottenPasswordtInterface,
  validateUpdatePassword,
  validateUpdateProfile,
} from "../validations/auth.validation";
import { generateToken } from "../functions/general";
import { Conversation } from "../models/conversation.model";

dotenv.config();

const login = async (request: Request, response: Response) => {
  // Get request body
  const body = request.body;

  // Validate request body
  const error = validateLogin(body).error?.details[0].message;
  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  const user = await User.findOne({
    $or: [{ pin: body.pin }, { email: body.email }],
  });

  if (!user)
    return response.status(401).json({ error: "wrong_email_or_password" });

  const compare_result = await bcrypt.compare(body.password, user.password);
  if (!compare_result)
    return response.status(401).json({ error: "wrong_email_or_password" });

  if (!user.is_verified)
    return response.status(405).json({ error: "user_not_verified" });

  const conversations = await Conversation.aggregate([
    {
      $match: {
        $or: [
          { between: user._id },
          { between: { $eq: null } },
          { between: { $size: 0 } },
        ],
      },
    },
    {
      $addFields: {
        recipient_id: {
          $cond: [
            {
              $and: [
                { $isArray: "$between" },
                { $eq: [{ $size: "$between" }, 2] },
              ],
            },
            {
              $filter: {
                input: "$between",
                as: "id",
                cond: { $ne: ["$$id", user._id] },
              },
            },
            [],
          ],
        },
      },
    },
    {
      $unwind: {
        path: "$recipient_id",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "recipient_id",
        foreignField: "_id",
        as: "recipient",
      },
    },
    {
      $unwind: {
        path: "$recipient",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "messages",
        localField: "last_message",
        foreignField: "_id",
        as: "last_message",
      },
    },
    {
      $unwind: {
        path: "$last_message",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "last_message.sender",
        foreignField: "_id",
        as: "sender_user",
      },
    },
    {
      $unwind: {
        path: "$sender_user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        between: 1,
        created_at: 1,
        deleted_for: 1,
        recipient: {
          _id: "$recipient._id",
          username: "$recipient.username",
          profile_url: "$recipient.profile_url",
        },

        last_message: {
          $cond: {
            if: { $eq: [{ $type: "$last_message._id" }, "objectId"] },
            then: {
              _id: "$last_message._id",
              sender_id: "$last_message.sender",
              receiver_id: "$last_message.receiver",
              created_at: "$last_message.created_at",
              is_text: "$last_message.is_text",
              content: "$last_message.content",
              deleted: {
                $cond: {
                  if: { $ne: ["$last_message.deleted_for_others_at", null] },
                  then: true,
                  else: false,
                },
              },
              sender_name: {
                $cond: {
                  if: { $eq: ["$last_message.sender", user._id] },
                  then: "You",
                  else: "$sender_user.username",
                },
              },
            },
            else: "$$REMOVE", // this removes the entire last_message field
          },
        },
      },
    },
  ]);

  const response_json: loginResponseInterface = {
    result: "logged_in",
    _id: user._id,
    email: user.email,
    username: user.username,
    pin: user.pin,
    profile_url: `http://${process.env.DOMAIN}:${process.env.PORT}/${user.profile_url}`,
    token: generateToken(user._id),
    is_online: false,
    conversations,
  };

  return response.status(200).json(response_json);
};

const createNewAccount = async (request: Request, response: Response) => {
  // Stop request if imagae isn't existed
  if (!request.file)
    return response.status(400).json({
      result: "image_required",
    });

  // Get body from request
  const body: createUserAccountBodyInterface = request.body;

  // Get image source
  const file_source = path.join(__dirname, `../temp/${body.file_name}`);

  // Validate body
  const error = validateCreateAccount(body).error?.details[0].message;
  if (error) {
    await deleteFile(file_source);
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  // Check if pin or email is taken
  const is_user_existed = await User.exists({
    $or: [{ pin: body.pin }, { email: body.email }],
  });

  if (is_user_existed) {
    await deleteFile(file_source);
    return response.status(405).json({ result: "email_or_pin_taken" });
  }

  // Move image file from temp to public
  const file_destination = path.join(__dirname, `../public/${body.file_name}`);
  await moveFile({
    file_source,
    file_destination,
  });

  // Hash password
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashed_password = await bcrypt.hash(body.password, salt);

  // Create account for user
  const user = await User.create({
    username: body.username,
    password: hashed_password,
    email: body.email,
    pin: body.pin,
    profile_url: `public/${body.file_name}`,
  });

  // Create new token
  const token = await Token.create({
    value: crypto.randomBytes(32).toString("hex"),
    user_id: user._id,
  });

  // Send email
  await sendEmail({
    email: user.email,
    subject: "Activate Account",
    link: `${process.env.FRONT_END_URL}/verify_account/${token.value}`,
    is_for_activate_account: true,
  });

  // Rerturn response
  return response.status(201).json({
    result: "account_created",
  });
};

const forgotPassword = async (request: Request, response: Response) => {
  // Get body from request
  const body: forgotPasswordBodyInterface = request.body;

  // Validate request body
  const error = validateForgotPassword(body).error?.details[0].message;
  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  // Check if email existed
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return response.status(404).json({
      result: "user_not_found",
    });
  }

  // Check user if verified
  if (!user.is_verified)
    return response.status(405).json({
      result: "user_is_not_verified",
    });

  // Check if token already created
  const is_token_existed = await Token.exists({
    user_id: user._id,
  });

  if (is_token_existed)
    return response.status(405).json({
      result: "token_already_sent",
    });

  // Create new token
  const token = await Token.create({
    value: crypto.randomBytes(32).toString("hex"),
    user_id: user._id,
  });

  //Send email
  await sendEmail({
    email: user.email,
    subject: "Reset Password",
    link: `${process.env.FRONT_END_URL}/update_forgotten_password/${token.value}`,
    is_for_activate_account: false,
  });

  //Send response
  return response.status(201).json({
    result: "email_sent",
  });
};

const updateProfileData = async (request: Request, response: Response) => {
  // Get body from request
  const body: updateProfileBodyInterface = request.body;
  let file_source: string = "";

  // Validate body
  const error = validateUpdateProfile(body).error?.details[0].message;

  // save file source inside variable
  if (body.file_name)
    file_source = path.join(__dirname, `../temp/${body.file_name}`);

  // Stop request if validation fails
  if (error) {
    // Delete file
    if (body.file_name) await deleteFile(file_source);
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }
  if (!body.user) {
    throw new Error("User not found");
  }

  // Update username
  if (body.username) body.user.username = body.username;
  // Update user profile
  if (body.file_name) {
    // Delete old image
    await deleteFile(path.join(__dirname, `../${body.user.profile_url}`));
    const file_destination = path.join(
      __dirname,
      `../public/${body.file_name}`
    );
    // Move file from temp to public
    await moveFile({ file_source, file_destination });
    // Update profile url
    body.user.profile_url = `public/${body.file_name}`;
  }
  // Save user data
  await body.user.save();

  // Prepare response json
  const response_json: updateProfileResponseInterface = {
    result: "data_updated",
  };

  // Return response
  if (body.file_name)
    response_json.new_profile_url = `http://${process.env.DOMAIN}:${process.env.PORT}/${body.user.profile_url}`;
  return response.status(202).json(response_json);
};

const updatePassword = async (request: Request, response: Response) => {
  const body: updatePasswordBodyInterface = request.body;
  const error = validateUpdatePassword(body).error?.details[0].message;

  if (error)
    return response.status(400).json({
      result: "validation_error",
      error,
    });

  if (!body.user) {
    throw new Error("User not found in body");
  }

  const compare_result = await bcrypt.compare(
    body.old_password,
    body.user.password
  );
  if (!compare_result)
    return response.status(401).json({ error: "old_password_wrong" });

  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashed_password = await bcrypt.hash(body.new_password, salt);

  body.user.password = hashed_password;
  await body.user.save();

  response.status(202).json({
    result: "password_updated",
  });
};

const deleteUserAccount = async (request: Request, response: Response) => {
  const body: deleteUserAccountBodyInterface = request.body;
  if (!body.user) throw new Error("User not found");

  body.user.deleted_at = new Date();
  return response.status(202).json({
    result: "user_accout_deleted",
  });
};

const verifyAccount = async (request: Request, response: Response) => {
  // Get params from request
  const { token } = request.params;

  // Validate params data
  const error = validateActivateAccount({ token }).error?.details[0].message;
  if (error)
    return response.status(400).json({
      result: "validation_error",
      error,
    });

  // Get token
  const user_token = await Token.where("value", token).findOne();
  if (!user_token)
    return response.status(404).json({
      result: "token_not_found",
    });

  const user = await User.findById(user_token.user_id);
  if (!user)
    return response.status(410).json({
      result: "user_account_deleted",
    });

  if (user.is_verified) {
    return response.status(406).json({
      result: "user_already_verified",
    });
  }

  user.is_verified = true;
  await user.save();
  await user_token.deleteOne();

  return response.json({
    result: "user_verified",
  });
};

const updateForgottenPassword = async (
  request: Request,
  response: Response
) => {
  // Get request body
  const body: updateForgottenPasswordBodytInterface = request.body;

  // Validate request body
  const error =
    validateUpdateForgottenPasswordtInterface(body).error?.details[0].message;
  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  // Find token
  const token = await Token.findOne({ value: body.token });
  if (!token)
    return response.status(404).json({
      result: "token_not_found",
    });

  // Find user
  const user = await User.findById(token.user_id);
  if (!user)
    return response.status(410).json({
      result: "user_account_deleted",
    });

  // Hash password
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashed_password = await bcrypt.hash(body.password, salt);

  // Update password and delete token
  user.password = hashed_password;
  await user.save();
  await token.deleteOne();

  // Return response
  return response.status(202).json({
    result: "password_updated",
  });
};

export {
  login,
  createNewAccount,
  forgotPassword,
  updateProfileData,
  updatePassword,
  deleteUserAccount,
  verifyAccount,
  updateForgottenPassword,
};
