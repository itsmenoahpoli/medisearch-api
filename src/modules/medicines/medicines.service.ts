import { BaseService } from "~/modules/base.service";
import { TMedicine } from "~/modules/medicines/medicines.dto";
import { slugify } from "~/utilities/string.util";

type TMedicinesReqQuery = {
  name?: string;
};
export class MedicinesService extends BaseService {
  constructor() {
    super();
  }

  public searchMedicine = async (itemNumber: string) => {
    const medicine = await this.db.medicine.findUnique({
      where: {
        itemNumber,
      },
    });

    if (!medicine) return null;

    return medicine;
  };

  public getMedicines = async (query: TMedicinesReqQuery) => {
    const medicines = await this.db.medicine.findMany({
      orderBy: [{ id: "desc" }],
    });

    if (query.name) {
      return medicines.filter((medicine: any) => medicine.name.toLowerCase().includes(query.name?.toLowerCase()));
    }

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
    const medicine = await this.db.medicine.update({
      where: { id },
      data: {
        deletedAt: this.convertDateToISO(this.dateNow()),
      },
    });

    return medicine;
  };

  public forceDeleteMedicineById = async (id: number) => {
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
