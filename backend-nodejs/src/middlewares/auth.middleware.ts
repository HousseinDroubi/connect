import { Request, Response, NextFunction } from "express";
import { getIdFromToken, isObjectIdValid } from "../functions/general";
import { request } from "http";
import User from "../models/user.model";

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

const isUserAccountDeleted = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { _id } = request.body;
  const user = await User.findById(_id);

  if (!user)
    return response.status(404).json({
      result: "user_not_found",
    });

  if (user.deleted_at)
    return response.status(410).json({
      result: "user_account_deleted",
    });

  request.body.user = user;

  next();
};

export { isUserAuthenticated, isUserAccountDeleted };
