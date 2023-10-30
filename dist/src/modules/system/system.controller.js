"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemController = void 0;
class SystemController {
    healthcheck = (request, response, next) => {
        try {
            return response.status(200).json({ message: "System online!" });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.SystemController = SystemController;
