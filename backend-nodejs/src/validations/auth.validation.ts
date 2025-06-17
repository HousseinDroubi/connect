import joi from "joi";
import { createUserAccountBodyInterface } from "../interfaces/controller.interface";

const validateCreateAccount = (data: createUserAccountBodyInterface) => {
  const schema = joi.object({
    email: joi.string().required().label("Email").email().messages({
      "any.required": "email_is_required",
      "string.email": "invalid_email",
    }),
    pin: joi
      .string()
      .required()
      .label("Pin")
      .pattern(/^\d{6}$/)
      .messages({
        "string.pattern.base": "pin_must_be_exactly_6_digits",
        "number.base": "pin_must_be_of_type_number",
        "any.required": "pin_is_required",
      }),
    password: joi
      .string()
      .required()
      .label("Password")
      .min(5)
      .max(20)
      .messages({
        "string.empty": "password_is_required",
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
        "string.empty": "username_is_required",
        "string.min": "username_must_be_minimum_3_digits",
        "string.max": "username_must_be_maximum_10_digits",
      }),
    file_name: joi.string().required().messages({
      "any.required": "file_name_is_required",
    }),
  });
  return schema.validate(data);
};

export { validateCreateAccount };
