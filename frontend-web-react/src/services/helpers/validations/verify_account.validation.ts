import Joi from "joi";
import { verifyAccountParamInterface } from "../../../interfaces/requests/verify_token_request";

const validateActivateAccount = (data: verifyAccountParamInterface) => {
  const schema = Joi.object({
    token: Joi.string().required().label("Token").messages({
      "any.required": "token_is_required",
      "string.base": "token_must_be_of_type_string",
      "string.empty": "token_is_not_allowed_to_be_empty",
    }),
  });
  return schema.validate(data);
};

export { validateActivateAccount };
