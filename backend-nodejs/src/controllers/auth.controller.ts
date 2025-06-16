import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { createUserAccountBodyInterface } from "../interfaces/model.interface";
import { Request, Response, response } from "express";
import User from "../models/user.model";

dotenv.config();

const login = async (request: Request, response: Response) => {
  // login
};

const createNewAccount = async (request: Request, response: Response) => {
  // TODO: implement validation

  const body: createUserAccountBodyInterface = request.body;
  const password = body.password;
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashed_password = await bcrypt.hash(body.password, salt);

  const user = User.create({
    username: body.username,
    password: hashed_password,
    email: body.email,
    pin: body.pin,
  });

  // TODO: save image

  // TODO: send email verification

  // ! Testing
  response.json({
    password,
    hashed_password,
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
