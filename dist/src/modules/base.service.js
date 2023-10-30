"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const client_1 = require("@prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
class BaseService {
    prismaClient;
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    get db() {
        return this.prismaClient;
    }
    convertDateToISO = (dateStr) => {
        return new Date(dateStr).toISOString();
    };
    dateNow = () => {
        return (0, dayjs_1.default)().format("MM/DD/YYYY");
    };
}
exports.BaseService = BaseService;
