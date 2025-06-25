import joi from "joi";

const getConversationMessagesValidation = (data: string) => {
  const schema = joi
    .alternatives()
    .try(
      joi
        .string()
        .pattern(/^\d{6}$/)
        .messages({
          "string.pattern.base": "pin_must_be_exactly_6_digits",
        }),
      joi.string().valid("broadcast").messages({
        "any.only": "pin_must_be_exactly_6_digits_or_broadcast",
      })
    )
    .required()
    .label("Pin")
    .messages({
      "string.base": "pin_must_be_of_type_string",
      "string.empty": "pin_is_not_allowed_to_be_empty",
    });

  return schema.validate(data);
};

const deleteConversationValidation = (data: string) => {
  const schema = joi
    .string()
    .pattern(/^\d{6}$/)
    .messages({
      "string.pattern.base": "pin_must_be_exactly_6_digits",
    });

  return schema.validate(data);
};

export { getConversationMessagesValidation, deleteConversationValidation };
