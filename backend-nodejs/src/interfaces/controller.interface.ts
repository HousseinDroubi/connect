import { Request, Response } from "express";

interface controllerFunctionInterface {
  readonly request: Request;
  readonly response: Response;
}

export { controllerFunctionInterface };
