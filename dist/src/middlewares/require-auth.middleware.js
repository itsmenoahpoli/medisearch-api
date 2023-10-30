"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireAuthMiddleware = void 0;
const services_1 = require("../services");
const jwtService = new services_1.JWTService();
const RequireAuthMiddleware = async (request, response, next) => {
    const authHeader = request.headers["authorization"];
    const authToken = authHeader?.split(" ")[1];
    if (!authHeader)
        return response.status(403).json({ message: "FORBIDDEN" });
    try {
        const user = await jwtService.verifyToken(authToken);
        // @ts-ignore
        request.user = user;
    }
    catch (error) {
        return response.status(401).json({ message: "Unauthorized", error });
    }
    next();
};
exports.RequireAuthMiddleware = RequireAuthMiddleware;
