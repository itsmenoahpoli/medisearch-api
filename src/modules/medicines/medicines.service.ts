import { BaseService } from "~/modules/base.service";
import { TMedicine } from "~/modules/medicines/medicines.dto";
import { slugify } from "~/utilities/string.util";

export class MedicinesService extends BaseService {
  constructor() {
    super();
  }

  public getMedicines = async () => {
    const medicines = await this.db.medicine.findMany({
      orderBy: [{ id: "desc" }],
    });

    return medicines;
  };

  public getMedicineById = async (id: number) => {
    const medicine = await this.db.medicine.findUnique({
      where: { id },
    });

    return medicine;
  };

  public updateMedicineById = async (id: number, medicineData: TMedicine) => {
    const medicine = await this.db.medicine.update({
      where: { id },
      data: medicineData,
    });

    return medicine;
  };

  public deleteMedicineById = async (id: number) => {
    const medicine = await this.db.medicine.delete({
      where: { id },
    });

    return medicine;
  };

  public createMedicine = async (medicineData: TMedicine) => {
    const medicine = await this.db.medicine.create({
      data: {
        ...medicineData,
        nameSlug: slugify(medicineData.name),
      },
    });

    return medicine;
  };
}
