import joi from "joi";
import {
  createUserAccountBodyInterface,
  verifyAccountParamsInterface,
} from "../interfaces/controller.interface";

const validateCreateAccount = (data: createUserAccountBodyInterface) => {
  const schema = joi.object({
    email: joi.string().required().label("Email").email().messages({
      "any.required": "email_is_required",
      "string.email": "invalid_email",
      "string.empty": "email_is_not_allowed_to_be_empty",
    }),
    pin: joi
      .string()
      .required()
      .label("Pin")
      .pattern(/^\d{6}$/)
      .messages({
        "string.pattern.base": "pin_must_be_exactly_6_digits",
        "any.required": "pin_is_required",
        "string.empty": "pin_is_not_allowed_to_be_empty",
      }),
    password: joi
      .string()
      .required()
      .label("Password")
      .min(5)
      .max(20)
      .messages({
        "any.required": "password_is_required",
        "string.empty": "password_is_not_allowed_to_be_empty",
        "string.min": "password_must_be_minimum_5_digits",
        "string.max": "password_must_be_maximum_20_digits",
      }),
    username: joi
      .string()
      .required()
      .label("Username")
      .min(3)
      .max(10)
      .messages({
        "any.required": "username_is_required",
        "string.empty": "username_is_not_allowed_to_be_empty",
        "string.min": "username_must_be_minimum_3_digits",
        "string.max": "username_must_be_maximum_10_digits",
      }),
    file_name: joi.string().required().messages({
      "any.required": "file_name_is_required",
    }),
  });
  return schema.validate(data);
};

const validateActivateAccount = (data: verifyAccountParamsInterface) => {
  const schema = joi.object({
    token: joi.string().required().label("Token").messages({
      "any.required": "token_is_required",
      "string.empty": "token_is_not_allowed_to_be_empty",
    }),
  });
  return schema.validate(data);
};

export { validateCreateAccount, validateActivateAccount };
