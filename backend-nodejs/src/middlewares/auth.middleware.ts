import { Request, Response, NextFunction } from "express";
import { getIdFromToken } from "../functions/general";

declare module "express-serve-static-core" {
  interface Request {
    _id?: string;
  }
}

const isUserAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const _id = getIdFromToken(request.headers.authorization);
  if (!_id) return response.status(401).json({ error: "invalid_id" });
  request._id = _id;
  next();
};

export { isUserAuthenticated };
