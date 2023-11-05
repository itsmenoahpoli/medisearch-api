import { Router } from "express";
import { OrdersController } from "~/modules/orders/orders.controller";

export class OrdersRouter {
  private router: Router;
  private ordersController: OrdersController;

  constructor() {
    this.router = Router();
    this.ordersController = new OrdersController();

    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.post("/", this.ordersController.createOrderHandler);
  }

  get getRoutes(): Router {
    return this.router;
  }
}
