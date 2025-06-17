import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user.model";
import { deleteFile, moveFile } from "../functions/server_file_system";
import path from "path";
import crypto from "crypto";
import {
  createUserAccountBodyInterface,
  forgotPasswordBodyInterface,
} from "../interfaces/controller.interface";
import { sendEmail } from "../emails/scripts/email";
import { Token } from "../models/token.model";
import {
  validateActivateAccount,
  validateCreateAccount,
  validateForgotPassword,
  validateLogin,
} from "../validations/auth.validation";
import { generateToken } from "../functions/general";

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

  return response.status(200).json({
    result: "logged_in",
    _id: user._id,
    email: user.email,
    username: user.username,
    pin: user.pin,
    profile_url: `http://${process.env.DOMAIN}:${process.env.PORT}/${user.profile_url}`,
    token: generateToken(user._id),
  });
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
    deleteFile(file_source);
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
    deleteFile(file_source);
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
  // updateProfileData
};

const updatePassword = async (request: Request, response: Response) => {
  // updatePassword
};

const deleteUserAccount = async (request: Request, response: Response) => {
  // deleteUserAccount
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

export {
  login,
  createNewAccount,
  forgotPassword,
  updateProfileData,
  updatePassword,
  deleteUserAccount,
  verifyAccount,
};
