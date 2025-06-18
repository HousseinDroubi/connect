import { Request, Response, NextFunction } from "express";
import { getIdFromToken } from "../functions/general";

declare module "express-serve-static-core" {
  interface Request {
    user_id?: string;
  }
}

const isUserAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const _id = getIdFromToken(request.headers.authorization);
  if (!_id) return response.status(401).json({ error: "invalid_id" });
  request.user_id = _id;
  next();
};

export { isUserAuthenticated };
