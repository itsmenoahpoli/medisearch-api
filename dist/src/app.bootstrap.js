"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainApp = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router_1 = require("./router");
const middlewares_1 = require("./middlewares");
dotenv_1.default.config();
const RATE_LIMIT_CONFIG = {
    windowMs: 600000,
    max: 50,
};
class MainApp {
    app;
    appRouter;
    constructor() {
        this.app = (0, express_1.default)();
        this.appRouter = new router_1.AppRouter();
        this.initializeApp();
    }
    initializeApp() {
        this.app.use(express_1.default.static("public"));
        this.app.use(express_1.default.json());
        this.app.use((0, express_rate_limit_1.default)(RATE_LIMIT_CONFIG));
        this.app.disable("powered-by");
        this.initializeAppRoutes(this.app);
        this.initializeAppMiddlewares(this.app);
    }
    initializeAppRoutes(app) {
        this.appRouter.initializeApiRoutes(app);
    }
    initializeAppMiddlewares(app) {
        app.use(middlewares_1.ErrorHandlerMiddleware);
    }
    runApp() {
        const PORT = process.env.APP_PORT || 5000;
        if (!PORT) {
            console.error(`[ERROR]: no app port specified, please fix.`);
            process.exit();
        }
        this.app.listen(process.env.APP_PORT, () => {
            if (process.env.NODE_ENV === "development") {
                console.log(`[APPLICATION]: App running in http://localhost:${PORT}`);
            }
        });
    }
}
exports.MainApp = MainApp;
