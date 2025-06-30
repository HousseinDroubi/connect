import { tokenValidationError } from "./attributes_validation_responses";

export type activateAccountRequestValidationError =
  | tokenValidationError
  | undefined;
