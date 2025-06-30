import {
  confirmationPasswordValidationError,
  passwordValidationError,
} from "./attributes_validation_responses";

export type updateForgottenPasswordRequestValidationError =
  | passwordValidationError
  | confirmationPasswordValidationError
  | undefined;
