import mongoose from "mongoose";
import { userDocumentInterface } from "../documents/user.document.interface";

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

interface updatePasswordBodyInterface extends userDocumentInterface {
  user_id: mongoose.Schema.Types.ObjectId;
  new_password: string;
  old_password: string;
}

interface updateProfileBodyInterface extends userDocumentInterface {
  user_id: mongoose.Schema.Types.ObjectId;
  file_name?: string;
  username?: string;
}

interface updateProfileResponseInterface {
  result: string;
  new_profile_url?: string;
}

export {
  createUserAccountBodyInterface,
  verifyAccountParamsInterface,
  loginBodyType,
  forgotPasswordBodyInterface,
  updateForgottenPasswordBodytInterface,
  updatePasswordBodyInterface,
  updateProfileBodyInterface,
  updateProfileResponseInterface,
};
