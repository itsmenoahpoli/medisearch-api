"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicinesRouter = void 0;
const express_1 = require("express");
const medicines_controller_1 = require("../../modules/medicines/medicines.controller");
class MedicinesRouter {
    router;
    medicinesController;
    constructor() {
        this.router = (0, express_1.Router)();
        this.medicinesController = new medicines_controller_1.MedicinesController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router
            .get("/", this.medicinesController.getMedicinesHandler)
            .get("/:id", this.medicinesController.getMedicineByIdHandler)
            .patch("/:id", this.medicinesController.updateMedicineByIdHandler)
            .delete("/:id", this.medicinesController.deleteMedicineByIdHandler)
            .delete("/force-delete/:id", this.medicinesController.forceDeleteMedicineByIdHandler)
            .post("/", this.medicinesController.createMedicineHandler);
    }
    get getRoutes() {
        return this.router;
    }
}
exports.MedicinesRouter = MedicinesRouter;
