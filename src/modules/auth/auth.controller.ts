import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { AuthService } from "~/modules/auth/auth.service";
import { CredentialsDTO, UserProfileDTO, CustomerRegisterDTO } from "~/modules/auth/auth.dto";

export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();

    this.authService = new AuthService();
  }

  public verifyAccountHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.authService.verifyAccount(Number(request.params.userId));

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public customerRegisterHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(CustomerRegisterDTO, request.body);

      if (requestValidated.isError) {
        return response.status(400).json(requestValidated.errors);
      }

      const data = await this.authService.customerRegister(request.body);

      if (data === "USER_EMAIL_ALREADY_USED") {
        return response.status(400).json(data);
      }

      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

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
      const user = request.user;

      const data = await this.authService.unauthenticateCredentials(user, request.headers["authorization"]?.split(" ")[1] as string);

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getMyProfileHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const user = request.user;

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateMyProfileHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const user = request.user;

      const requestValidated = await this.validateRequestBody(UserProfileDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.authService.updateMyProfile(user.id, request.body);

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
