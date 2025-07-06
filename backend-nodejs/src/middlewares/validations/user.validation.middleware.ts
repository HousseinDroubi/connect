import { Request, Response, NextFunction } from "express";
import { validateSearchForUsers } from "../../validations/user.validation";

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

export { searchForUsersValidationMiddleware };
