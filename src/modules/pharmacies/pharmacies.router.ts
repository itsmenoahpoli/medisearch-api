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
      .get("/", this.pharmaciesController.getPharmaciesHandler)
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
