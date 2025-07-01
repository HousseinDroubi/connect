import Joi from "joi";
import { createAccountBodyInterface } from "../../../interfaces/requests/create_account_request";
import { showPopupText } from "../popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { createAccountRequestValidationError } from "../../../interfaces/validations_responses/create_account_validtion_responses";

const showValidationForCreateAccountRequest = (
  setPopupProps: SetPopupType,
  error: createAccountRequestValidationError
) => {
  switch (error) {
    case "image_is_required":
      showPopupText(setPopupProps, "Image is required");
      break;
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
    case "username_is_not_allowed_to_be_empty":
    case "username_is_required":
      showPopupText(setPopupProps, "Username is required");
      break;
    case "username_must_be_minimum_3_digits":
    case "username_must_be_maximum_10_digits":
      showPopupText(
        setPopupProps,
        "Username characters must be between 3 and 10 digits"
      );
      break;
    case "username_must_be_of_type_string":
      showPopupText(setPopupProps, "Username must be of type text");
      break;
    case "pin_is_not_allowed_to_be_empty":
    case "pin_is_required":
      showPopupText(setPopupProps, "Pin is required");
      break;
    case "pin_must_be_of_type_string":
      showPopupText(setPopupProps, "Pin must be of type text");
      break;
    case "pin_must_be_exactly_6_digits":
      showPopupText(setPopupProps, "Pin must be exactly 6 digits");
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

const validateCreateAccount = (data: createAccountBodyInterface) => {
  const schema = Joi.object({
    image: Joi.object().required().label("Image").messages({
      "any.required": "image_is_required",
    }),
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
    username: Joi.string()
      .required()
      .label("Username")
      .min(3)
      .max(10)
      .messages({
        "string.base": "username_must_be_of_type_string",
        "any.required": "username_is_required",
        "string.empty": "username_is_not_allowed_to_be_empty",
        "string.min": "username_must_be_minimum_3_digits",
        "string.max": "username_must_be_maximum_10_digits",
      }),
    pin: Joi.string()
      .required()
      .label("Pin")
      .pattern(/^\d{6}$/)
      .messages({
        "string.base": "pin_must_be_of_type_string",
        "string.pattern.base": "pin_must_be_exactly_6_digits",
        "any.required": "pin_is_required",
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

  const allowed_types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
  const is_valid_image_type = allowed_types.some((type) =>
    data.image.type.startsWith(type)
  );

  if (!is_valid_image_type) {
    return "invalid_image_type";
  }

  return schema.validate(data).error?.details[0].message;
};

export { validateCreateAccount, showValidationForCreateAccountRequest };
