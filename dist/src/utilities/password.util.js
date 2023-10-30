"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (rawPassword) => {
    return await bcrypt_1.default.hash(rawPassword, 15);
};
exports.hashPassword = hashPassword;
const verifyPassword = async (rawPassword, hashedPassword) => {
    return await bcrypt_1.default.compare(rawPassword, hashedPassword);
};
exports.verifyPassword = verifyPassword;
