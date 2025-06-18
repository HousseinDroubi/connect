import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (_id: mongoose.Types.ObjectId) => {
  return jsonwebtoken.sign(
    {
      _id: String(_id),
    },
    process.env.JWT_PRIVATE_KEY as string,
    {
      expiresIn: "7d",
    }
  );
};

const getIdFromToken = (token: string | undefined): null | string => {
  if (!token || !process.env.PRIVATE_KEY) return null;

  try {
    const { _id } = jsonwebtoken.verify(
      token.split(" ")[1],
      process.env.PRIVATE_KEY
    ) as JwtPayload;

    return _id;
  } catch (err) {
    return null;
  }
};

export { generateToken, getIdFromToken };
