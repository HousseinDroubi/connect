import joi from "joi";
import {
  createUserAccountBodyInterface,
  forgotPasswordBodyInterface,
  loginBodyType,
  updateForgottenPasswordBodytInterface,
  updatePasswordBodyInterface,
  verifyAccountParamsInterface,
} from "../interfaces/controller.interface";
import mongoose from "mongoose";

const validateCreateAccount = (data: createUserAccountBodyInterface) => {
  const schema = joi.object({
    email: joi.string().required().label("Email").email().messages({
      "any.required": "email_is_required",
      "string.base": "email_must_be_of_type_string",
      "string.email": "invalid_email",
      "string.empty": "email_is_not_allowed_to_be_empty",
    }),
    pin: joi
      .string()
      .required()
      .label("Pin")
      .pattern(/^\d{6}$/)
      .messages({
        "string.base": "pin_must_be_of_type_string",
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
        "string.base": "password_must_be_of_type_string",
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
        "string.base": "username_must_be_of_type_string",
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
      "string.base": "token_must_be_of_type_string",
      "string.empty": "token_is_not_allowed_to_be_empty",
    }),
  });
  return schema.validate(data);
};

const validateLogin = (data: loginBodyType) => {
  const schema = joi
    .object({
      pin: joi
        .string()
        .pattern(/^\d{6}$/)
        .label("Pin")
        .messages({
          "string.base": "pin_must_be_of_type_string",
          "string.pattern.base": "pin_must_be_exactly_6_digits",
          "string.empty": "pin_is_not_allowed_to_be_empty",
        }),
      email: joi.string().email().label("Email").messages({
        "string.email": "invalid_email",
        "string.base": "email_must_be_of_type_string",
        "string.empty": "email_is_not_allowed_to_be_empty",
      }),
      password: joi
        .string()
        .required()
        .min(5)
        .max(20)
        .label("Password")
        .messages({
          "any.required": "password_is_required",
          "string.base": "password_must_be_of_type_string",
          "string.empty": "password_is_not_allowed_to_be_empty",
          "string.min": "password_must_be_minimum_5_digits",
          "string.max": "password_must_be_maximum_20_digits",
        }),
    })
    .xor("pin", "email")
    .required()
    .messages({
      "object.missing": "pin_or_email_is_required",
    });
  return schema.validate(data);
};

const validateForgotPassword = (data: forgotPasswordBodyInterface) => {
  const schema = joi.object({
    email: joi.string().required().email().label("Email").messages({
      "any.required": "email_is_required",
      "string.base": "email_must_be_of_type_string",
      "string.email": "invalid_email",
      "string.empty": "email_is_not_allowed_to_be_empty",
    }),
  });
  return schema.validate(data);
};

const validateUpdateForgottenPasswordtInterface = (
  data: updateForgottenPasswordBodytInterface
) => {
  const schema = joi.object({
    password: joi
      .string()
      .required()
      .min(5)
      .max(20)
      .label("Password")
      .messages({
        "any.required": "password_is_required",
        "string.base": "password_must_be_of_type_string",
        "string.empty": "password_is_not_allowed_to_be_empty",
        "string.min": "password_must_be_minimum_5_digits",
        "string.max": "password_must_be_maximum_20_digits",
      }),
    token: joi.string().required().label("Token").messages({
      "any.required": "token_is_required",
      "string.base": "token_must_be_of_type_string",
      "string.empty": "token_is_not_allowed_to_be_empty",
    }),
  });
  return schema.validate(data);
};

const validateUpdatePassword = (data: updatePasswordBodyInterface) => {
  const schema = joi.object({
    old_password: joi
      .string()
      .required()
      .min(5)
      .max(20)
      .label("Password")
      .messages({
        "any.required": "old_password_is_required",
        "string.base": "old_password_must_be_of_type_string",
        "string.empty": "old_password_is_not_allowed_to_be_empty",
        "string.min": "old_password_must_be_minimum_5_digits",
        "string.max": "old_password_must_be_maximum_20_digits",
      }),
    new_password: joi
      .string()
      .required()
      .min(5)
      .max(20)
      .label("Password")
      .messages({
        "any.required": "new_password_is_required",
        "string.base": "new_password_must_be_of_type_string",
        "string.empty": "new_password_is_not_allowed_to_be_empty",
        "string.min": "new_password_must_be_minimum_5_digits",
        "string.max": "new_password_must_be_maximum_20_digits",
      }),
    user_id: joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId Validation")
      .messages({
        "any.required": "object_id_is_required",
        "string.empty": "object_id_is_not_allowerd_to_be_empty",
        "any.invalid": "invalid_object_id",
      }),
  });
  return schema.validate(data);
};

export {
  validateCreateAccount,
  validateActivateAccount,
  validateLogin,
  validateForgotPassword,
  validateUpdateForgottenPasswordtInterface,
  validateUpdatePassword,
};
