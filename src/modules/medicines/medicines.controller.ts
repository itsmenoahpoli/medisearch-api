import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { MedicinesService } from "~/modules/medicines/medicines.service";
import { MedicineDTO, MedicineRatingDTO } from "~/modules/medicines/medicines.dto";

export class MedicinesController extends BaseController {
  private medicinesService: MedicinesService;

  constructor() {
    super();

    this.medicinesService = new MedicinesService();
  }

  public searchMedicineHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.searchMedicine(request.params.itemNumber);

      if (!data) {
        return response.status(404).json(data);
      }

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getMedicinesHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.getMedicines(request.query);

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getArchivedMedicinesHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.getArchivedMedicines();

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getMedicinesByPharmacyIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.getMedicinesByPharmacyId(Number(request.params.pharmacyId));

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

      if (!data) {
        return response.status(404).json(data);
      }

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

  public forceDeleteMedicineByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.forceDeleteMedicineById(Number(request.params.id));

      return response.status(204).json(data);
    } catch (error) {
      next(error);
    }
  };

  public restoreArhivedMedicineByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.restoreArchivedMedicineById(Number(request.params.medicineId));

      return response.status(200).json(data);
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

  public getMedicineRatingsHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.medicinesService.getMedicineRatings();

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createMedicineRatingHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(MedicineRatingDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.medicinesService.createMedicineRating(request.body);

      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };
}
