import {
  deleteMessageInterface,
  editMessageInterface,
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
    event_name: joi.string().valid("new_message").required(),
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

const validateEditMessage = (data: editMessageInterface) => {
  const schema = joi.object({
    event_name: joi.string().valid("edit_message").required(),
    message_id: joi.string().required(),
    message_new_content: joi.string().required().min(1).max(100),
    to: joi.string().allow(null).required(),
  });

  return schema.validate(data);
};

const validateDeleteMessage = (data: deleteMessageInterface) => {
  const schema = joi.object({
    event_name: joi.string().valid("delete_message").required(),
    message_id: joi.string().required(),
  });

  return schema.validate(data);
};

export {
  validateNewMessage,
  validateNewMessageEventName,
  validateEditMessage,
  validateDeleteMessage,
};
