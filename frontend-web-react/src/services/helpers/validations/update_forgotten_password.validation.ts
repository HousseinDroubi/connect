import Joi from "joi";
import { createAccountBodyInterface } from "../../../interfaces/requests/create_account_request";
import { showPopupText } from "../popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { createAccountRequestValidationError } from "../../../interfaces/validations_responses/create_account_validtion_responses";
import { updateForgottenPasswordRequestValidationError } from "../../../interfaces/validations_responses/update_forgotten_password_validtion_responses";
import { updateForgottenPasswordBodyInterface } from "../../../interfaces/requests/update_forgotten_password_request";

const showValidationForUpdateForgottenPasswordRequest = (
  setPopupProps: SetPopupType,
  error: updateForgottenPasswordRequestValidationError
) => {
  switch (error) {
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
      showPopupText(setPopupProps, "Password password must be of type text");
      break;
    case "confirmation_password_is_required":
    case "confirmation_password_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "Confirmation password is required");
      break;
    case "confirmation_password_must_be_minimum_5_digits":
    case "confirmation_password_must_be_maximum_20_digits":
      showPopupText(
        setPopupProps,
        "Confirmation passwod characters must be between 5 and 20"
      );
      break;
    case "confirmation_password_must_be_of_type_string":
      showPopupText(
        setPopupProps,
        "Confirmation password must be of tyoe t3ext"
      );
      break;
    case "password_must_equal_to_confirmation_password":
      showPopupText(setPopupProps, "Password must match confirm password");
      break;
  }
};

const validateUpdateForgottenPassword = (
  data: updateForgottenPasswordBodyInterface
) => {
  const schema = Joi.object({
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
    confirmation_password: Joi.string()
      .required()
      .label("Confirmation Password")
      .valid(Joi.ref("password"))
      .min(5)
      .max(20)
      .messages({
        "string.base": "confirmation_password_must_be_of_type_string",
        "any.required": "confirmation_password_is_required",
        "string.empty": "confirmation_password_is_not_allowed_to_be_empty",
        "string.min": "confirmation_password_must_be_minimum_5_digits",
        "string.max": "confirmation_password_must_be_maximum_20_digits",
        "any.only": "password_must_equal_to_confirmation_password",
      }),
  });
  return schema.validate(data);
};

export {
  validateUpdateForgottenPassword,
  showValidationForUpdateForgottenPasswordRequest,
};
