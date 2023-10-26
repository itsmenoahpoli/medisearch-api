import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { MedicinesService } from "~/modules/medicines/medicines.service";
import { MedicineDTO } from "~/modules/medicines/medicines.dto";

export class MedicinesController extends BaseController {
  private medicinesService: MedicinesService;

  constructor() {
    super();

    this.medicinesService = new MedicinesService();
  }

  public getMedicinesHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.getMedicines();

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getMedicineByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.getMedicineById(Number(request.params.id));

      if (!data) {
        return response.status(404).json(data);
      }

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public updateMedicineByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(MedicineDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.medicinesService.updateMedicineById(request.body, Number(request.params.id));

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public deleteMedicineByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.deleteMedicineById(Number(request.params.id));

      return response.status(204).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createMedicineHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(MedicineDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.medicinesService.createMedicine(request.body);

      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };
}
