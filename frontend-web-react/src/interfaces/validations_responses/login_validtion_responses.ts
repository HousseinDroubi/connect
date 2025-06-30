import {
  emailValidationError,
  passwordValidationError,
} from "./attributes_validation_responses";

export type loginRequestValidationError =
  | emailValidationError
  | passwordValidationError
  | undefined;
