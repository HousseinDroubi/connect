import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response, response } from "express";
import User from "../models/user.model";
import { moveFile } from "../functions/server_file_system";
import path from "path";
import { createUserAccountBodyInterface } from "../interfaces/controller.interface";

dotenv.config();

const login = async (request: Request, response: Response) => {
  // login
};

const createNewAccount = async (request: Request, response: Response) => {
  // TODO: implement validation
  // TODO: Check if email and pin are unique and if not delete file.

  // Get body from request
  const body: createUserAccountBodyInterface = request.body;
  console.log(body);

  // Move image file from temp to public
  const file_source = path.join(__dirname, `../temp/${body.file_name}`);
  const file_destination = path.join(__dirname, `../public/${body.file_name}`);
  await moveFile({
    file_source,
    file_destination,
  });

  // Hash password
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashed_password = await bcrypt.hash(body.password, salt);

  // Create account for user
  const user = User.create({
    username: body.username,
    password: hashed_password,
    email: body.email,
    pin: body.pin,
    profile_url: file_destination,
  });

  // TODO: send email verification

  // Rerturn response
  response.json({
    last_iamge: body.file_name,
    file_source,
    file_destination,
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

export {
  login,
  createNewAccount,
  forgotPassword,
  updateProfileData,
  updatePassword,
  deleteUserAccount,
};
