import Joi from "joi";
import { showPopupText } from "../helpers/popup_helper";
import { SetPopupType } from "../../interfaces/general_types";
import { updatePasswordBodyInterface } from "../../interfaces/requests/update_password_request";
import { updatePasswordRequestValidationError } from "../../interfaces/validations_responses/update_password_validtion_responses";

const showValidationForUpdatePasswordRequest = (
  setPopupProps: SetPopupType,
  error: updatePasswordRequestValidationError
) => {
  switch (error) {
    case "old_password_is_required":
    case "old_password_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "Old Password is required");
      break;
    case "old_password_must_be_minimum_5_digits":
    case "old_password_must_be_maximum_20_digits":
      showPopupText(
        setPopupProps,
        "Old password characters must be between 5 and 20"
      );
      break;
    case "old_password_must_be_of_type_string":
      showPopupText(setPopupProps, "Old password must be of type text");
      break;
    case "same_password_as_new_one":
      showPopupText(
        setPopupProps,
        "Old password must be different than new one!"
      );
      break;
    case "password_is_required":
    case "password_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "New password is required");
      break;
    case "password_must_be_minimum_5_digits":
    case "password_must_be_maximum_20_digits":
      showPopupText(
        setPopupProps,
        "New password characters must be between 5 and 20"
      );
      break;
    case "password_must_be_of_type_string":
      showPopupText(setPopupProps, "New password must be of type text");
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
      showPopupText(setPopupProps, "New password must match confirm password");
      break;
  }
};

const validateUpdatePassword = (data: updatePasswordBodyInterface) => {
  const schema = Joi.object({
    old_password: Joi.string()
      .required()
      .label("Password")
      .invalid(Joi.ref("new_password"))
      .min(5)
      .max(20)
      .messages({
        "string.base": "password_must_be_of_type_string",
        "any.required": "password_is_required",
        "any.invalid": "same_password_as_new_one",
        "string.empty": "password_is_not_allowed_to_be_empty",
        "string.min": "password_must_be_minimum_5_digits",
        "string.max": "password_must_be_maximum_20_digits",
      }),
    new_password: Joi.string()
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
    confirmation_new_password: Joi.string()
      .required()
      .label("Confirmation Password")
      .valid(Joi.ref("new_password"))
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

export { validateUpdatePassword, showValidationForUpdatePasswordRequest };
