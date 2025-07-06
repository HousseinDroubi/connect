import { Request, Response, NextFunction } from "express";
import {
  validateSearchForUsers,
  validateViewOtherUserProfile,
} from "../../validations/user.validation";
import { isObjectIdValid } from "../../functions/general";

const viewOtherUserProfileValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Get request body
  const { user_id } = request.params;

  // Validate request params
  const error = validateViewOtherUserProfile(user_id).error?.details[0].message;

  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  if (!isObjectIdValid(user_id))
    return response.status(400).json({
      result: "invalid_user_id",
    });

  next();
};

const searchForUsersValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Get request body
  const { content } = request.params;

  // Validate request params
  const error = validateSearchForUsers(content).error?.details[0].message;
  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  next();
};

export {
  viewOtherUserProfileValidationMiddleware,
  searchForUsersValidationMiddleware,
};
