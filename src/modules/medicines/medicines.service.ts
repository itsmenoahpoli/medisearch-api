import { BaseService } from "~/modules/base.service";
import { TMedicine, TMedicineRating } from "~/modules/medicines/medicines.dto";
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

    if (!medicine) return "MEDICINE_NOT_FOUND";

    return medicine;
  };

  public getArchivedMedicines = async () => {
    const medicines = await this.db.medicine.findMany({
      orderBy: [{ id: "desc" }],
      where: {
        deletedAt: {
          not: null,
        },
      },
    });

    return medicines;
  };

  public getMedicines = async (query: TMedicinesReqQuery) => {
    const medicines = await this.db.medicine.findMany({
      orderBy: [{ id: "desc" }],
      where: {
        deletedAt: null,
      },
      include: {
        pharmacy: true
      }
    });

    if (query.name) {
      return medicines.filter((medicine: any) => medicine.name.toLowerCase().includes(query.name?.toLowerCase()));
    }

    return medicines;
  };

  public getMedicinesByPharmacyId = async (pharmacyId: number) => {
    const medicines = await this.db.medicine.findMany({
      where: {
        pharmacyId
      }
    })

    return medicines
  }

  public getMedicineById = async (id: number) => {
    const medicine = await this.db.medicine.findUnique({
      where: { id },
    });

    if (!medicine) return "MEDICINE_NOT_FOUND";

    return medicine;
  };

  public getMedicineByItemNumber = async (itemNumber: string) => {
    const medicine = await this.db.medicine.findUnique({
      where: {
        itemNumber,
      },
    });

    if (!medicine) return "MEDICINE_NOT_FOUND";

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

  public restoreArchivedMedicineById = async (id: number) => {
    const medicine = await this.db.medicine.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });

    return medicine;
  };

  public getMedicineRatings = async () => {
    const medicineRatings = await this.db.medicineRating.findMany({
      orderBy: [{ id: "desc" }],
    });

    return medicineRatings;
  };

  public createMedicineRating = async (medicineRatingData: TMedicineRating) => {
    const medicineRating = await this.db.medicineRating.create({
      data: {
        ...medicineRatingData,
      },
    });

    return medicineRating;
  };
}
