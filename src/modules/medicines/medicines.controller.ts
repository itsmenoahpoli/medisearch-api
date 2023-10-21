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
}
