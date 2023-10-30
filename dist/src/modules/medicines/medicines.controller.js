"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicinesController = void 0;
const base_controller_1 = require("../../modules/base.controller");
const medicines_service_1 = require("../../modules/medicines/medicines.service");
const medicines_dto_1 = require("../../modules/medicines/medicines.dto");
class MedicinesController extends base_controller_1.BaseController {
    medicinesService;
    constructor() {
        super();
        this.medicinesService = new medicines_service_1.MedicinesService();
    }
    getMedicinesHandler = async (request, response, next) => {
        try {
            const data = await this.medicinesService.getMedicines();
            return response.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    getMedicineByIdHandler = async (request, response, next) => {
        try {
            const data = await this.medicinesService.getMedicineById(Number(request.params.id));
            if (!data) {
                return response.status(404).json(data);
            }
            return response.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    updateMedicineByIdHandler = async (request, response, next) => {
        try {
            const requestValidated = await this.validateRequestBody(medicines_dto_1.MedicineDTO, request.body);
            if (requestValidated.isError) {
                return next({ type: "validation-error", errors: requestValidated.errors });
            }
            const data = await this.medicinesService.updateMedicineById(request.body, Number(request.params.id));
            return response.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    deleteMedicineByIdHandler = async (request, response, next) => {
        try {
            const data = await this.medicinesService.deleteMedicineById(Number(request.params.id));
            return response.status(204).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    forceDeleteMedicineByIdHandler = async (request, response, next) => {
        try {
            const data = await this.medicinesService.forceDeleteMedicineById(Number(request.params.id));
            return response.status(204).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    createMedicineHandler = async (request, response, next) => {
        try {
            const requestValidated = await this.validateRequestBody(medicines_dto_1.MedicineDTO, request.body);
            if (requestValidated.isError) {
                return next({ type: "validation-error", errors: requestValidated.errors });
            }
            const data = await this.medicinesService.createMedicine(request.body);
            return response.status(201).json(data);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.MedicinesController = MedicinesController;
