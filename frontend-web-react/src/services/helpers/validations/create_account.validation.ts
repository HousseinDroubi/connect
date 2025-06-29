import Joi, { valid } from "joi";
import { createAccountBodyInterface } from "../../../interfaces/requests/create_account_request";

const validateCreateAccount = (data: createAccountBodyInterface) => {
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
        "any.only": "password_must_equal_to_confirm_password",
        "string.base": "password_must_be_of_type_string",
        "any.required": "password_is_required",
        "string.empty": "password_is_not_allowed_to_be_empty",
        "string.min": "password_must_be_minimum_5_digits",
        "string.max": "password_must_be_maximum_20_digits",
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

export { validateCreateAccount };
