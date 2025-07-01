import Joi from "joi";
import { createAccountBodyInterface } from "../../../interfaces/requests/create_account_request";
import { showPopupText } from "../popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { createAccountRequestValidationError } from "../../../interfaces/validations_responses/create_account_validtion_responses";
import { loginRequestValidationError } from "../../../interfaces/validations_responses/login_validtion_responses";
import { loginBodyInterface } from "../../../interfaces/requests/login_request";

const showValidationForLoginRequest = (
  setPopupProps: SetPopupType,
  error: loginRequestValidationError
) => {
  switch (error) {
    case "email_is_not_allowed_to_be_empty":
    case "email_is_required":
      showPopupText(setPopupProps, "Email is required");
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
  }
};

const validateLogin = (data: loginBodyInterface) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .label("Email")
      .email({ tlds: false })
      .messages({
        "any.required": "email_is_required",
        "string.base": "email_must_be_of_type_string",
        "string.email": "invalid_email",
        "string.empty": "email_is_not_allowed_to_be_empty",
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
  });

  return schema.validate(data).error?.details[0].message;
};

export { validateLogin, showValidationForLoginRequest };
