import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";

export class AuthController extends BaseController {
  constructor() {
    super();
  }

  public loginHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public logoutHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
