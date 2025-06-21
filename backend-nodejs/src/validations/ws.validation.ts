import {
  newMessageEventNameType,
  newMessageInterface,
} from "../interfaces/messages/singleton.interface";
import joi from "joi";

const validateNewMessageEventName = (data: newMessageEventNameType) => {
  const schema = joi
    .string()
    .valid("new_message", "edit_message", "delete_message")
    .required();
  return schema.validate(data);
};

const validateNewMessage = (data: newMessageInterface) => {
  const schema = joi.object({
    is_text: joi.boolean().required(),
    content: joi.required().when("is_text", {
      is: true,
      then: joi.string().min(1).max(100),
      otherwise: joi.string().min(10).max(100),
    }),
    to: joi.string().allow(null).required(),
  });

  return schema.validate(data);
};

export { validateNewMessage, validateNewMessageEventName };
