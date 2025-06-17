import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user.model";
import { deleteFile, moveFile } from "../functions/server_file_system";
import path from "path";
import crypto from "crypto";
import { createUserAccountBodyInterface } from "../interfaces/controller.interface";
import { sendEmail } from "../emails/scripts/email";
import { Token } from "../models/token.model";
import { validateCreateAccount } from "../validations/auth.validation";

dotenv.config();

const login = async (request: Request, response: Response) => {
  // login
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
  const is_user_existed = await User.findOne({
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
    profile_url: file_destination,
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
  // forgotPassword
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

const verifyAccount = (request: Request, response: Response) => {
  // verifyAccount
};

export {
  login,
  createNewAccount,
  forgotPassword,
  updateProfileData,
  updatePassword,
  deleteUserAccount,
};
