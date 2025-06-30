type imageValidationError = "image_is_required";

type emailValidationError =
  | "email_is_required"
  | "email_must_be_of_type_string"
  | "invalid_email"
  | "email_is_not_allowed_to_be_empty";

type passwordValidationError =
  | "password_must_be_of_type_string"
  | "password_is_required"
  | "password_is_not_allowed_to_be_empty"
  | "password_must_be_minimum_5_digits"
  | "password_must_be_maximum_20_digits";

type confirmationPasswordValidationError =
  | "confirmation_password_must_be_of_type_string"
  | "confirmation_password_is_required"
  | "confirmation_password_is_not_allowed_to_be_empty"
  | "confirmation_password_must_be_minimum_5_digits"
  | "confirmation_password_must_be_maximum_20_digits"
  | "password_must_equal_to_confirmation_password";

type pinValidationError =
  | "pin_must_be_of_type_string"
  | "pin_must_be_exactly_6_digits"
  | "pin_is_required"
  | "pin_is_not_allowed_to_be_empty";

type usernameValidationError =
  | "username_must_be_of_type_string"
  | "username_is_required"
  | "username_is_not_allowed_to_be_empty"
  | "username_must_be_minimum_3_digits"
  | "username_must_be_maximum_10_digits";

type tokenValidationError =
  | "token_is_required"
  | "token_must_be_of_type_string"
  | "token_is_not_allowed_to_be_empty";

export type {
  imageValidationError,
  emailValidationError,
  passwordValidationError,
  confirmationPasswordValidationError,
  pinValidationError,
  usernameValidationError,
  tokenValidationError,
};
