import { Application } from "express";
import { SystemRouter } from "~/modules/system/system.router";
import { AuthRouter } from "~/modules/auth/auth.router";

const routesConfig = [
  {
    route: "/system",
    router: new SystemRouter().getRoutes,
  },
  {
    route: "/auth",
    router: new AuthRouter().getRoutes,
  },
];

export class AppRouter {
  public initializeApiRoutes = (app: Application, apiPrefix: string = "/api"): void => {
    routesConfig.forEach((item) => {
      app.use(apiPrefix + item.route, item.router);
    });
  };
}
