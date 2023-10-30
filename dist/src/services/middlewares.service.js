"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewaresService = void 0;
const middlewares_1 = require("../middlewares");
class MiddlewaresService {
    getMiddleware(name) {
        const middlewares = {
            requireAuth: middlewares_1.RequireAuthMiddleware,
        };
        return middlewares[name];
    }
}
exports.MiddlewaresService = MiddlewaresService;
