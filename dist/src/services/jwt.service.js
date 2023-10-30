"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const base_service_1 = require("../modules/base.service");
const env_util_1 = require("../utilities/env.util");
class JWTService extends base_service_1.BaseService {
    JWT_SECRET;
    constructor() {
        super();
        this.JWT_SECRET = (0, env_util_1.getEnv)("JWT_SECRET");
    }
    createToken = (payload) => {
        return jwt.sign(payload, this.JWT_SECRET, { expiresIn: "1d", algorithm: "HS512" });
    };
    verifyToken = async (token) => {
        const user = jwt.verify(token, this.JWT_SECRET);
        if (user) {
            const tokenInDB = await this.db.userJWT.findFirst({ where: { token } });
            if (tokenInDB?.isRevoked) {
                throw Error("Unauthorized");
            }
            return user;
        }
        throw Error("Unauthorized");
    };
    revokeToken = async (token) => {
        // TODO: Revoke token for logout
    };
}
exports.JWTService = JWTService;
