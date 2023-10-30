"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemRouter = void 0;
const express_1 = require("express");
const system_controller_1 = require("../../modules/system/system.controller");
class SystemRouter {
    router;
    systemController;
    constructor() {
        this.router = (0, express_1.Router)();
        this.systemController = new system_controller_1.SystemController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/healthcheck", this.systemController.healthcheck);
    }
    get getRoutes() {
        return this.router;
    }
}
exports.SystemRouter = SystemRouter;
