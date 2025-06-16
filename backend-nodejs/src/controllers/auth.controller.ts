import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { createUserAccountBodyInterface } from "../interfaces/model.interface";
import { Request, Response, response } from "express";

dotenv.config();

const login = async (request: Request, response: Response) => {
  // login
};

const createNewAccount = async (request: Request, response: Response) => {
  const body: createUserAccountBodyInterface = request.body;
  const password = body.password;
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashed_password = await bcrypt.hash(body.password, salt);

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
