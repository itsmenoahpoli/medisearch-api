import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { CustomersService } from "~/modules/customers/customers.service";

export class CustomersController extends BaseController {
  constructor() {
    super();
  }

  public getCustomerAddressesHandler = (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public addCustomerAddressHandler = (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public deleteCustomerAddressHandler = (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
