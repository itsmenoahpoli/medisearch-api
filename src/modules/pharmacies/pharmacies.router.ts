import { Router } from "express";
import { PharmaciesController } from "~/modules/pharmacies/pharmacies.controller";

export class PharmaciesRouter {
  private router: Router;
  private pharmaciesController: PharmaciesController;

  constructor() {
    this.router = Router();
    this.pharmaciesController = new PharmaciesController();

    this.setupRoutes();
  }

  public setupRoutes() {
    this.router
      .get("/ratings", this.pharmaciesController.getPharmacyRatingsHandler)
      .post("/ratings", this.pharmaciesController.createPharmacyRatingHandler)
      .get("/archived", this.pharmaciesController.getArchivedPharmaciesHandler)
      .post("/archived/:pharmacyId/restore", this.pharmaciesController.restoreArchivedPharmacyByIdHandler)
      .get("/", this.pharmaciesController.getPharmaciesHandler)
      .get("/city/:city", this.pharmaciesController.getPharmacyByItemCityHandler)
      .get("/:id", this.pharmaciesController.getPharmacyByIdHandler)
      .patch("/:id", this.pharmaciesController.updatePharmacyByIdHandler)
      .delete("/:id", this.pharmaciesController.deletePharmacyByIdHandler)
      .delete("/force-delete/:id", this.pharmaciesController.forceDeletePharmacyByIdHandler)
      .post("/", this.pharmaciesController.createPharmacyHandler);
  }

  get getRoutes(): Router {
    return this.router;
  }
}
