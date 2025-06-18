import { Request, Response, NextFunction } from "express";
import { getIdFromToken, isObjectIdValid } from "../functions/general";

const isUserAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const _id = getIdFromToken(request.headers.authorization);
  console.log(request.headers.authorization);
  console.log(isObjectIdValid(_id!));
  if (!_id) return response.status(401).json({ error: "invalid_id" });
  request.body.user_id = _id;
  next();
};

export { isUserAuthenticated };
