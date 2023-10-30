import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { AuthService } from "~/modules/auth/auth.service";
import { JWTService } from "~/services";
import { CredentialsDTO } from "~/modules/auth/auth.dto";

export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();

    this.authService = new AuthService();
  }

  public currentAuthUserHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const data = request.user;

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public loginHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(CredentialsDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.authService.authenticateCredentials(request.body, request.body.authType);

      if (!data.user) {
        return response.status(401).json(data);
      }

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public logoutHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const user = this.getAuthUser(request.headers["authorization"]);

      const data = await this.authService.unauthenticateCredentials(user, request.headers["authorization"]?.split(" ")[1] as string);

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getMyProfileHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = this.getAuthUser(request.headers["authorization"] as string);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
