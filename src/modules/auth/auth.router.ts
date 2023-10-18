import { Router } from "express";
import { AuthController } from "~/modules/auth/auth.controller";
import { MiddlewaresService } from "~/services/middlewares.service";

export class AuthRouter extends MiddlewaresService {
  private router: Router;
  private authController: AuthController;

  constructor() {
    super();

    this.router = Router();
    this.authController = new AuthController();

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router
      .get("/me", this.getMiddleware("requireAuth"), this.authController.currentAuthUserHandler)
      .post("/logout", this.getMiddleware("requireAuth"), this.authController.logoutHandler)
      .post("/login", this.authController.loginHandler);
  }

  get getRoutes(): Router {
    return this.router;
  }
}
