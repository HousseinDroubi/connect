import { Request, Response, NextFunction } from "express";
import { getConversationMessagesValidation } from "../../validations/middleware.validation";

const getConversationMessagesValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { pin } = request.params;
  const error =
    getConversationMessagesValidation(pin).error?.details[0].message;

  if (error) {
    return response.status(400).json({
      result: "validation_error",
      error,
    });
  }

  next();
};

export { getConversationMessagesValidationMiddleware };
