"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseController {
    validateRequestBody = async (dto, obj) => {
        const transformedClass = (0, class_transformer_1.plainToClass)(dto, obj);
        const errors = await (0, class_validator_1.validate)(transformedClass);
        if (errors.length > 0) {
            return {
                isError: true,
                errors: errors.map((err) => ({
                    field: err.property,
                    errors: err.constraints,
                })),
            };
        }
        return {
            isError: false,
            errors: undefined,
        };
    };
}
exports.BaseController = BaseController;
