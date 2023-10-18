import { Router } from "express";
import { SystemController } from "~/modules/system/system.controller";

export class SystemRouter {
  private router: Router;
  private systemController: SystemController;

  constructor() {
    this.router = Router();
    this.systemController = new SystemController();

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get("/healthcheck", this.systemController.healthcheck);
  }

  get getRoutes(): Router {
    return this.router;
  }
}
