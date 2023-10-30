"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const system_router_1 = require("../modules/system/system.router");
const auth_router_1 = require("../modules/auth/auth.router");
const medicines_router_1 = require("../modules/medicines/medicines.router");
const routesConfig = [
    {
        route: "/system",
        router: new system_router_1.SystemRouter().getRoutes,
    },
    {
        route: "/auth",
        router: new auth_router_1.AuthRouter().getRoutes,
    },
    {
        route: "/medicines",
        router: new medicines_router_1.MedicinesRouter().getRoutes,
    },
];
class AppRouter {
    initializeApiRoutes = (app, apiPrefix = "/api") => {
        routesConfig.forEach((item) => {
            app.use(apiPrefix + item.route, item.router);
        });
    };
}
exports.AppRouter = AppRouter;
