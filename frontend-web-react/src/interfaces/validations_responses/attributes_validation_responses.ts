export type emailValidationError =
  | "email_is_required"
  | "email_must_be_of_type_string"
  | "invalid_email"
  | "email_is_not_allowed_to_be_empty";

export type passwordValidationError =
  | "password_must_be_of_type_string"
  | "password_is_required"
  | "password_is_not_allowed_to_be_empty"
  | "password_must_be_minimum_5_digits"
  | "password_must_be_maximum_20_digits";

export type confirmationPasswordValidationError =
  | passwordValidationError
  | "password_must_equal_to_confirm_password";

export type imageValidationError = "invalid_image_type";

export type pinValidationError =
  | "pin_must_be_of_type_string"
  | "pin_must_be_exactly_6_digits"
  | "pin_is_required"
  | "pin_is_not_allowed_to_be_empty";

export type usernameValidationError =
  | "username_must_be_of_type_string"
  | "username_is_required"
  | "username_is_not_allowed_to_be_empty"
  | "username_must_be_minimum_3_digits"
  | "username_must_be_maximum_10_digits";
