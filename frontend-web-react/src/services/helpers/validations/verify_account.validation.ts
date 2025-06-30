import Joi from "joi";
import { verifyAccountParamInterface } from "../../../interfaces/requests/verify_token_request";
import { showPopupText } from "../popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { activateAccountRequestValidationError } from "../../../interfaces/validations_responses/activate_account_validtion_responses";

const showValidationForActivateAccountRequest = (
  setPopupProps: SetPopupType,
  error: activateAccountRequestValidationError
) => {
  switch (error) {
    case "token_is_required":
    case "token_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "Token is required");
      break;
    case "token_must_be_of_type_string":
      showPopupText(setPopupProps, "Token must be of type text");
      break;
  }
};

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

export { validateActivateAccount, showValidationForActivateAccountRequest };
