import joi from "joi";

const validateViewOtherUserProfile = (data: string) => {
  const schema = joi.string().required();
  return schema.validate(data);
};

export { validateViewOtherUserProfile };
