import { Router } from "express";
import { MedicinesController } from "~/modules/medicines/medicines.controller";

export class MedicinesRouter {
  private router: Router;
  private medicinesController: MedicinesController;

  constructor() {
    this.router = Router();
    this.medicinesController = new MedicinesController();

    this.setupRoutes();
  }

  public setupRoutes() {
    this.router
      .get("/ratings", this.medicinesController.getMedicineRatingsHandler)
      .post("/ratings", this.medicinesController.createMedicineRatingHandler)
      .get("/archived", this.medicinesController.getArchivedMedicinesHandler)
      .post("/archived/:medicineId/restore", this.medicinesController.restoreArhivedMedicineByIdHandler)
      .get("/", this.medicinesController.getMedicinesHandler)
      .get("/:id", this.medicinesController.getMedicineByIdHandler)
      .get("/search/:itemNumber", this.medicinesController.searchMedicineHandler)
      .patch("/:id", this.medicinesController.updateMedicineByIdHandler)
      .delete("/:id", this.medicinesController.deleteMedicineByIdHandler)
      .delete("/force-delete/:id", this.medicinesController.forceDeleteMedicineByIdHandler)
      .post("/", this.medicinesController.createMedicineHandler);
  }

  get getRoutes(): Router {
    return this.router;
  }
}
