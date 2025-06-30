import {
  confirmationPasswordValidationError,
  passwordValidationError,
  tokenValidationError,
} from "./attributes_validation_responses";

export type updateForgottenPasswordRequestValidationError =
  | tokenValidationError
  | passwordValidationError
  | confirmationPasswordValidationError
  | undefined;
