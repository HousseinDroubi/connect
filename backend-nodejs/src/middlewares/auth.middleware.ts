import { Request, Response, NextFunction } from "express";
import { getIdFromToken, isObjectIdValid } from "../functions/general";

const isUserAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const _id = getIdFromToken(request.headers.authorization);

  if (!_id) return response.status(401).json({ error: "invalid_id" });
  request.body.user_id = _id;
  next();
};

export { isUserAuthenticated };
