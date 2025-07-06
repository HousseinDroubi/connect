import joi from "joi";

const validateSearchForUsers = (data: string) => {
  const schema = joi.string().required();
  return schema.validate(data);
};

export { validateSearchForUsers };
