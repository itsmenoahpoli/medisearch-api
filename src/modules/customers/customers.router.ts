import { Router } from "express";
import { CustomersController } from "~/modules/customers/customers.controller";

export class CustomersRouter {
  private router: Router;
  private customersController: CustomersController;

  constructor() {
    this.router = Router();
    this.customersController = new CustomersController();

    this.setupRoutes();
  }

  public setupRoutes() {
    this.router
      .get("/addresses/customer/:customerId", this.customersController.getCustomerAddressesHandler)
      .post("/addresses", this.customersController.addCustomerAddressHandler)
      .delete("/addresses/:addressId", this.customersController.deleteCustomerAddressHandler);
  }

  get getRoutes(): Router {
    return this.router;
  }
}
