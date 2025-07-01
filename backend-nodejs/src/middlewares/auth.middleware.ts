import { Request, Response, NextFunction } from "express";
import { getIdFromToken } from "../functions/general";
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

const isUserAccountUnverifiedOrDeleted = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { user_id } = request.body;

  const user = await User.findById(user_id);

  if (!user)
    return response.status(404).json({
      result: "user_not_found",
    });

  if (!user.is_verified)
    return response.status(405).json({ error: "user_not_verified" });

  if (user.deleted_at)
    return response.status(405).json({
      result: "user_account_deleted",
    });

  request.body.user = user;

  next();
};

export { isUserAuthenticated, isUserAccountUnverifiedOrDeleted };
