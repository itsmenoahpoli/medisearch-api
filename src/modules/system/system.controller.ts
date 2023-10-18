import { Request, Response, NextFunction } from "express";

export class SystemController {
  public healthcheck = (request: Request, response: Response, next: NextFunction) => {
    try {
      return response.status(200).json({ message: "System online!" });
    } catch (error) {
      next(error);
    }
  };
}
