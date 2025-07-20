import Joi from "joi";
import { showPopupText } from "../helpers/popup_helper";
import { SetPopupType } from "../../interfaces/general_types";
import { forgotPasswordRequestValidationError } from "../../interfaces/validations_responses/forgot_password_validtion_responses";
import { forgotPasswordBodyInterface } from "../../interfaces/requests/forgot_password_request";

const showValidationForForgotPasswordRequest = (
  setPopupProps: SetPopupType,
  error: forgotPasswordRequestValidationError
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
  }
};

const validateForgotPassword = (data: forgotPasswordBodyInterface) => {
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
  });
  return schema.validate(data).error?.details[0].message;
};

export { validateForgotPassword, showValidationForForgotPasswordRequest };
