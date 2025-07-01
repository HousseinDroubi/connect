import { usernameValidationError } from "./attributes_validation_responses";

export type updateProfileDataRequestValidationError =
  | Omit<usernameValidationError, "username_is_required">
  | "either_image_or_username_is_required"
  | undefined;
