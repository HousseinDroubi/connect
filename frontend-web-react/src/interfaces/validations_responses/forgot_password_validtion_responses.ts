import { emailValidationError } from "./attributes_validation_responses";

export type forgotPasswordRequestValidationError =
  | emailValidationError
  | undefined;
