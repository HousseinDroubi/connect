import Joi from "joi";
import { showPopupText } from "../popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { loginBodyInterface } from "../../../interfaces/requests/login_request";
import { loginRequestValidationError } from "../../../interfaces/validations_responses/login_validtion_responses";

const showValidationForLoginRequest = (
  setPopupProps: SetPopupType,
  error: loginRequestValidationError
) => {
  switch (error) {
    case "pin_must_be_of_type_string":
      showPopupText(setPopupProps, "Pin must be of type string");
      break;
    case "pin_must_be_exactly_6_digits":
      showPopupText(setPopupProps, "Pin must be exactly 6 digits");
      break;
    case "pin_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "Pin is not allowed to be empty");
      break;
    case "email_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "Email is not allowed to be empty");
      break;
    case "email_must_be_of_type_string":
      showPopupText(setPopupProps, "Email must be of type text");
      break;
    case "invalid_email":
      showPopupText(setPopupProps, "Invalid email");
      break;
    case "password_is_required":
    case "password_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "Password is required");
      break;
    case "password_must_be_minimum_5_digits":
    case "password_must_be_maximum_20_digits":
      showPopupText(
        setPopupProps,
        "Password characters must be between 5 and 20"
      );
      break;
    case "password_must_be_of_type_string":
      showPopupText(setPopupProps, "Password must be of type text");
      break;
    case "either_email_or_pin_is_required":
      showPopupText(setPopupProps, "Either enter email or pin");
      break;
  }
};

const validateLogin = (data: loginBodyInterface) => {
  const schema = Joi.object({
    email: Joi.string().label("Email").email({ tlds: false }).messages({
      "any.required": "email_is_required",
      "string.base": "email_must_be_of_type_string",
      "string.email": "invalid_email",
      "string.empty": "email_is_not_allowed_to_be_empty",
    }),
    pin: Joi.string()
      .label("Pin")
      .pattern(/^\d{6}$/)
      .messages({
        "string.base": "pin_must_be_of_type_string",
        "string.pattern.base": "pin_must_be_exactly_6_digits",
        "string.empty": "pin_is_not_allowed_to_be_empty",
      }),
    password: Joi.string()
      .required()
      .label("Password")
      .min(5)
      .max(20)
      .messages({
        "string.base": "password_must_be_of_type_string",
        "any.required": "password_is_required",
        "string.empty": "password_is_not_allowed_to_be_empty",
        "string.min": "password_must_be_minimum_5_digits",
        "string.max": "password_must_be_maximum_20_digits",
      }),
  })
    .or("email", "pin")
    .messages({
      "object.missing": "either_email_or_pin_is_required",
    });

  return schema.validate(data).error?.details[0].message;
};

export { validateLogin, showValidationForLoginRequest };
