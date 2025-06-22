import mongoose from "mongoose";
import { userDocumentInterface } from "../documents/user.document.interface";

interface loginBodyInterface {
  email: string;
  pin: string;
  password: string;
}

interface createUserAccountBodyInterface {
  email: string;
  username: string;
  pin: number;
  password: string;
  file_name: string;
}

interface verifyAccountParamsInterface {
  token: string;
}

interface loginViaEmailAndPasswordInterface {
  email: string;
  password: string;
}

interface loginViaPinAndPasswordInterface {
  pin: string;
  password: string;
}

type loginBodyType =
  | loginViaEmailAndPasswordInterface
  | loginViaPinAndPasswordInterface;

interface forgotPasswordBodyInterface {
  email: string;
}

interface updateForgottenPasswordBodytInterface {
  password: string;
  token: string;
}

interface updatePasswordBodyInterface {
  new_password: string;
  old_password: string;
}

interface updateProfileBodyInterface {
  file_name?: string;
  username?: string;
}

interface deleteUserAccountBodyInterface extends userDocumentInterface {
  user_id: mongoose.Types.ObjectId;
}

export {
  loginBodyInterface,
  createUserAccountBodyInterface,
  verifyAccountParamsInterface,
  loginBodyType,
  forgotPasswordBodyInterface,
  updateForgottenPasswordBodytInterface,
  updatePasswordBodyInterface,
  updateProfileBodyInterface,
  deleteUserAccountBodyInterface,
};
