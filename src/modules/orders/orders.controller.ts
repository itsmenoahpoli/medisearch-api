import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { OrdersService } from "~/modules/orders/orders.service";
import { OrderDTO } from "~/modules/orders/orders.dto";

export class OrdersController extends BaseController {
  private ordersService: OrdersService;

  constructor() {
    super();

    this.ordersService = new OrdersService();
  }

  public getOrdersHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.ordersService.getOrders();

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getOrderByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.ordersService.getOrderById(Number(request.params.id));

      if (!data) {
        return response.status(404).json(data);
      }

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createOrderHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(OrderDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.ordersService.createOrder(request.body);

      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };
}
