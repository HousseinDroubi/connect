import mongoose from "mongoose";

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
  user_id: mongoose.Schema.Types.ObjectId;
  new_password: string;
  old_password: string;
}

interface updateProfileBodyInterface {
  user_id: mongoose.Schema.Types.ObjectId;
  file_name?: string;
  username?: string;
}

export {
  createUserAccountBodyInterface,
  verifyAccountParamsInterface,
  loginBodyType,
  forgotPasswordBodyInterface,
  updateForgottenPasswordBodytInterface,
  updatePasswordBodyInterface,
  updateProfileBodyInterface,
};
