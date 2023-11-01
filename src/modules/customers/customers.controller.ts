import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { CustomersService } from "~/modules/customers/customers.service";
import { UserAddressDTO } from "~/modules/customers/customers.dto";

export class CustomersController extends BaseController {
  private customersService: CustomersService;

  constructor() {
    super();

    this.customersService = new CustomersService();
  }

  public getCustomerAddressesHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.customersService.getCustomerAddresses(Number(request.params.customerId));

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public addCustomerAddressHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(UserAddressDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.customersService.addCustomerAddress(request.body);

      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  public deleteCustomerAddressHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.customersService.deleteCustomerAddress(Number(request.params.addressId));

      return response.status(204).json(data);
    } catch (error) {
      next(error);
    }
  };
}
