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
    } catch (error) {
      next(error);
    }
  };

  public updateMedicineByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  };

  public deleteMedicineByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  };

  public createMedicineHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  };
}
