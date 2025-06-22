import { Request, Response, NextFunction } from "express";
import {
  validateActivateAccount,
  validateCreateAccount,
  validateForgotPassword,
  validateLogin,
  validateUpdateForgottenPasswordtInterface,
  validateUpdatePassword,
  validateUpdateProfile,
} from "../../validations/auth.validation";
import {
  createUserAccountBodyInterface,
  forgotPasswordBodyInterface,
  loginBodyInterface,
  updateForgottenPasswordBodytInterface,
  updatePasswordBodyInterface,
  updateProfileBodyInterface,
} from "../../interfaces/controllers/auth.controller.interfaces";
import { deleteFile } from "../../functions/server_file_system";
import path from "path";

const loginValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Get request body
  const body: loginBodyInterface = request.body;

  // Validate request body
  const error = validateLogin(body).error?.details[0].message;
  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }
  next();
};

const createAccountValidationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Stop request if imagae isn't existed
  if (!request.file)
    return response.status(400).json({
      result: "image_required",
    });

  // Get body from request
  const body: createUserAccountBodyInterface = request.body;

  // Validate body
  const error = validateCreateAccount(body).error?.details[0].message;

  const file_source = path.join(__dirname, `../temp/${body.file_name}`);

  if (error) {
    await deleteFile(file_source);
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }
  next();
};

const verifyAccountValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Get params from request
  const { token } = request.params;

  // Validate params data
  const error = validateActivateAccount({ token }).error?.details[0].message;
  if (error)
    return response.status(400).json({
      result: "validation_error",
      error,
    });

  next();
};

const forgotPasswordValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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

  next();
};

const updateProfileDataValidationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Get body from request
  const body: updateProfileBodyInterface = request.body;
  let file_source: string = "";

  // Validate body
  const error = validateUpdateProfile(body).error?.details[0].message;

  // save file source inside variable
  if (body.file_name)
    file_source = path.join(__dirname, `../temp/${body.file_name}`);

  // Stop request if validation fails
  if (error) {
    // Delete file
    if (body.file_name) await deleteFile(file_source);
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  next();
};

const updatePasswordValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: updatePasswordBodyInterface = request.body;
  const error = validateUpdatePassword(body).error?.details[0].message;

  if (error)
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  next();
};

const updateForgottenPasswordValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Get request body
  const body: updateForgottenPasswordBodytInterface = request.body;

  // Validate request body
  const error =
    validateUpdateForgottenPasswordtInterface(body).error?.details[0].message;
  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  next();
};

export {
  loginValidationMiddleware,
  createAccountValidationMiddleware,
  verifyAccountValidationMiddleware,
  forgotPasswordValidationMiddleware,
  updateProfileDataValidationMiddleware,
  updatePasswordValidationMiddleware,
  updateForgottenPasswordValidationMiddleware,
};
