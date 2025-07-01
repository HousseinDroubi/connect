import {
  confirmationPasswordValidationError,
  passwordValidationError,
  oldaPassowrdValidationError,
} from "./attributes_validation_responses";

export type updatePasswordRequestValidationError =
  | oldaPassowrdValidationError
  | passwordValidationError
  | confirmationPasswordValidationError
  | undefined;
