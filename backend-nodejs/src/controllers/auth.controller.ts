import { controllerFunctionInterface } from "../interfaces/controller.interface";

const login = async ({ request, response }: controllerFunctionInterface) => {
  // login
};

const createNewAccount = async ({
  request,
  response,
}: controllerFunctionInterface) => {
  // createNewAccount
};

const forgotPassword = async ({
  request,
  response,
}: controllerFunctionInterface) => {
  // forgotPassword
};

const updateProfileData = async ({
  request,
  response,
}: controllerFunctionInterface) => {
  // updateProfileData
};

const updatePassword = async ({
  request,
  response,
}: controllerFunctionInterface) => {
  // updatePassword
};

const deleteUserAccount = async ({
  request,
  response,
}: controllerFunctionInterface) => {
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
