import joi from "joi";

const viewOtherUserProfileValidation = (data: string) => {
  const schema = joi.string().required();
  return schema.validate(data);
};

export {
  viewOtherUserProfileValidation
};
