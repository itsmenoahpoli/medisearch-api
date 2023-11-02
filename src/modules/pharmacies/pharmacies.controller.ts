import { Request, Response, NextFunction } from "express";
import { BaseController } from "~/modules/base.controller";
import { PharmaciesService } from "~/modules/pharmacies/pharmacies.service";
import { PharmacyDTO, PharmacyRatingDTO } from "~/modules/pharmacies/pharmacies.dto";

export class PharmaciesController extends BaseController {
  private pharmaciesService: PharmaciesService;

  constructor() {
    super();

    this.pharmaciesService = new PharmaciesService();
  }

  public getPharmaciesHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.getPharmacies();

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getArchivedPharmaciesHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.getArchivedPharmacies();

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getPharmacyByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.getPharmacyById(Number(request.params.id));

      if (!data) {
        return response.status(404).json(data);
      }

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getPharmacyByItemCityHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.getPharmacyByCity(request.params.city);

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public updatePharmacyByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(PharmacyDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.pharmaciesService.updatePharmacyById(request.body, Number(request.params.id));

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public deletePharmacyByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.deletePharmacyById(Number(request.params.id));

      return response.status(204).json(data);
    } catch (error) {
      next(error);
    }
  };

  public forceDeletePharmacyByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.forceDeletePharmacyById(Number(request.params.id));

      return response.status(204).json(data);
    } catch (error) {
      next(error);
    }
  };

  public restoreArchivedPharmacyByIdHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.restoreArchivedPharmacyById(Number(request.params.pharmacyId));

      return response.status(204).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createPharmacyHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(PharmacyDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.pharmaciesService.createPharmacy(request.body);

      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getPharmacyRatingsHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.pharmaciesService.getPharmacyRatings();

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createPharmacyRatingHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestValidated = await this.validateRequestBody(PharmacyRatingDTO, request.body);

      if (requestValidated.isError) {
        return next({ type: "validation-error", errors: requestValidated.errors });
      }

      const data = await this.pharmaciesService.createPharmacyRating(request.body);

      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };
}
