import joi from "joi";

const getConversationMessagesValidation = (data: string) => {
  const schema = joi
    .string()
    .required()
    .pattern(/^\d{6}$/)
    .label("Pin")
    .messages({
      "string.base": "pin_must_be_of_type_string",
      "string.pattern.base": "pin_must_be_exactly_6_digits",
      "string.empty": "pin_is_not_allowed_to_be_empty",
    });
  return schema.validate(data);
};

export { getConversationMessagesValidation };
