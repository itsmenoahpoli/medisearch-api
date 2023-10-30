"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const ErrorHandlerMiddleware = (error, request, response, next) => {
    let errCode = error.statusCode || 500;
    let errMessage = error.message || "INTERNAL_SERVER_ERROR";
    let errTrace = process.env.NODE_ENV === "development" ? error.stack : null;
    if (error.type === "validation-error") {
        errCode = 400;
        errMessage = "BAD_REQUEST";
        return response.status(errCode).json({
            errCode,
            errMessage,
            errors: error.errors,
            errTrace,
        });
    }
    return response.status(errCode).json({
        errCode,
        errMessage,
        errTrace,
    });
};
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
