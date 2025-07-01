import Joi from "joi";
import { showPopupText } from "../popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { updateProfileDataBodyInterface } from "../../../interfaces/requests/update_profile_data_request";
import { updateProfileDataRequestValidationError } from "../../../interfaces/validations_responses/update_profile_data_validtion_responses";

const showValidationForUpdateProfileDataRequest = (
  setPopupProps: SetPopupType,
  error: updateProfileDataRequestValidationError
) => {
  switch (error) {
    case "either_image_or_username_is_required":
      showPopupText(
        setPopupProps,
        "Please choose image and/or username to continue"
      );
      break;
    case "username_is_not_allowed_to_be_empty":
      showPopupText(setPopupProps, "Username is required");
      break;
    case "username_must_be_minimum_3_digits":
    case "username_must_be_maximum_10_digits":
      showPopupText(
        setPopupProps,
        "Username characters must be between 3 and 10 digits"
      );
      break;
    case "username_must_be_of_type_string":
      showPopupText(setPopupProps, "Username must be of type text");
      break;
  }
};

const validateUpdateProfileData = (data: updateProfileDataBodyInterface) => {
  const schema = Joi.object({
    image: Joi.object().label("Image"),
    username: Joi.string().label("Username").min(3).max(10).messages({
      "string.base": "username_must_be_of_type_string",
      "string.empty": "username_is_not_allowed_to_be_empty",
      "string.min": "username_must_be_minimum_3_digits",
      "string.max": "username_must_be_maximum_10_digits",
    }),
  })
    .or("username", "image")
    .messages({
      "object.missing": "either_image_or_username_is_required",
    });
  return schema.validate(data);
};

export { validateUpdateProfileData, showValidationForUpdateProfileDataRequest };
