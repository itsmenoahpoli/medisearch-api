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

    if (!medicine) return null;

    return medicine;
  };

  public getMedicineByItemNumber = async (itemNumber: string) => {
    const medicine = await this.db.medicine.findUnique({
      where: {
        itemNumber,
      },
    });

    if (!medicine) return null;

    return medicine;
  };

  public updateMedicineById = async (medicineData: TMedicine, id: number) => {
    const medicine = await this.db.medicine.update({
      where: { id },
      data: {
        ...medicineData,
        nameSlug: slugify(medicineData.name),
        expirationDate: this.convertDateToISO(medicineData.expirationDate),
        reservationDate: this.convertDateToISO(medicineData.reservationDate),
      },
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
        expirationDate: this.convertDateToISO(medicineData.expirationDate),
        reservationDate: this.convertDateToISO(medicineData.reservationDate),
      },
    });

    return medicine;
  };
}
