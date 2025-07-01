import {
  emailValidationError,
  passwordValidationError,
  pinValidationError,
} from "./attributes_validation_responses";

export type loginRequestValidationError =
  | Exclude<emailValidationError, "email_is_required">
  | Exclude<pinValidationError, "pin_is_required">
  | passwordValidationError
  | "either_email_or_pin_is_required"
  | undefined;
