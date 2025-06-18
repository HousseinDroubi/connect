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
}

export {
  createUserAccountBodyInterface,
  verifyAccountParamsInterface,
  loginBodyType,
  forgotPasswordBodyInterface,
  updateForgottenPasswordBodytInterface,
  updatePasswordBodyInterface,
};
