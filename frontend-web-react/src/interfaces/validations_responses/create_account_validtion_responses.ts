import {
  confirmationPasswordValidationError,
  emailValidationError,
  imageValidationError,
  passwordValidationError,
  pinValidationError,
  usernameValidationError,
} from "./attributes_validation_responses";

export type createAccountRequestValidationError =
  | imageValidationError
  | usernameValidationError
  | emailValidationError
  | pinValidationError
  | passwordValidationError
  | confirmationPasswordValidationError
  | undefined;
