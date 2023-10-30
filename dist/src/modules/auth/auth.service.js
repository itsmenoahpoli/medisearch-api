"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const base_service_1 = require("../../modules/base.service");
const services_1 = require("../../services");
const auth_dto_1 = require("../../modules/auth/auth.dto");
class AuthService extends base_service_1.BaseService {
    jwtService;
    constructor() {
        super();
        this.jwtService = new services_1.JWTService();
    }
    authenticateCredentials = async (credentials, authType) => {
        const user = await this.db.user.findUnique({
            where: {
                email: credentials.email,
            },
        });
        if (!user)
            return { user: null };
        if ((authType === auth_dto_1.TAuthType.ADMIN && user.userType === auth_dto_1.TAuthType.CUSTOMER) ||
            (authType === auth_dto_1.TAuthType.CUSTOMER && user.userType === auth_dto_1.TAuthType.ADMIN)) {
            return {
                user: null,
                message: "INCORRECT_AUTH_TYPE_FOR_USER_TYPE",
            };
        }
        // @ts-ignore
        delete user["password"];
        const { token } = await this.prismaClient.userJWT.create({
            data: {
                userId: user.id,
                token: this.jwtService.createToken(user),
            },
        });
        return {
            authToken: token,
            user,
        };
    };
    unauthenticateCredentials = async (user, token) => {
        await this.db.userJWT.updateMany({
            where: {
                userId: user.id,
                token,
            },
            data: {
                isRevoked: true,
            },
        });
        return {
            message: "USER_UNAUTHENTICATED",
        };
    };
}
exports.AuthService = AuthService;
