"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const base_controller_1 = require("../../modules/base.controller");
const auth_service_1 = require("../../modules/auth/auth.service");
const auth_dto_1 = require("../../modules/auth/auth.dto");
class AuthController extends base_controller_1.BaseController {
    authService;
    constructor() {
        super();
        this.authService = new auth_service_1.AuthService();
    }
    currentAuthUserHandler = async (request, response, next) => {
        try {
            // @ts-ignore
            const data = request.user;
            return response.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    loginHandler = async (request, response, next) => {
        try {
            const requestValidated = await this.validateRequestBody(auth_dto_1.CredentialsDTO, request.body);
            if (requestValidated.isError) {
                return next({ type: "validation-error", errors: requestValidated.errors });
            }
            const data = await this.authService.authenticateCredentials(request.body, request.body.authType);
            if (!data.user) {
                return response.status(401).json(data);
            }
            return response.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    logoutHandler = async (request, response, next) => {
        try {
            // @ts-ignore
            const user = request.user;
            const authToken = request.headers["authorization"]?.split(" ")[1];
            const data = await this.authService.unauthenticateCredentials(user, authToken);
            return response.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.AuthController = AuthController;
