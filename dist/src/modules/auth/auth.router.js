"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../../modules/auth/auth.controller");
const middlewares_service_1 = require("../../services/middlewares.service");
class AuthRouter extends middlewares_service_1.MiddlewaresService {
    router;
    authController;
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router
            .get("/me", this.getMiddleware("requireAuth"), this.authController.currentAuthUserHandler)
            .post("/logout", this.getMiddleware("requireAuth"), this.authController.logoutHandler)
            .post("/login", this.authController.loginHandler);
    }
    get getRoutes() {
        return this.router;
    }
}
exports.AuthRouter = AuthRouter;
