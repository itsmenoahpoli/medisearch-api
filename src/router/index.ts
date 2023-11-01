import { Application } from "express";
import { SystemRouter } from "~/modules/system/system.router";
import { AuthRouter } from "~/modules/auth/auth.router";
import { MedicinesRouter } from "~/modules/medicines/medicines.router";
import { PharmaciesRouter } from "~/modules/pharmacies/pharmacies.router";
import { CustomersRouter } from "~/modules/customers/customers.router";

const routesConfig = [
  {
    route: "/system",
    router: new SystemRouter().getRoutes,
  },
  {
    route: "/auth",
    router: new AuthRouter().getRoutes,
  },
  {
    route: "/medicines",
    router: new MedicinesRouter().getRoutes,
  },
  {
    route: "/pharmacies",
    router: new PharmaciesRouter().getRoutes,
  },
  {
    route: "/customers",
    router: new CustomersRouter().getRoutes,
  },
];

export class AppRouter {
  public initializeApiRoutes = (app: Application, apiPrefix: string = "/api"): void => {
    routesConfig.forEach((item) => {
      app.use(apiPrefix + item.route, item.router);
    });
  };
}
