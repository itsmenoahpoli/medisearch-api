import { Pharmacy } from "@prisma/client";
import { BaseService } from "~/modules/base.service";
import { TPharmacy, TPharmacyRating } from "~/modules/pharmacies/pharmacies.dto";
import { slugify } from "~/utilities/string.util";

export class PharmaciesService extends BaseService {
  constructor() {
    super();
  }

  public getPharmacies = async () => {
    const pharmarcies = await this.db.pharmacy.findMany({
      orderBy: [{ id: "desc" }],
    });

    return pharmarcies;
  };

  public getPharmacyById = async (id: number) => {
    const pharmacy = await this.db.pharmacy.findUnique({
      where: { id },
    });

    if (!pharmacy) return null;

    return pharmacy;
  };

  public getPharmacyByCity = async (city: string) => {
    const pharmacies = await this.db.pharmacy.findMany();

    return pharmacies.filter((pharmacy: Pharmacy) => pharmacy.address.toLowerCase().includes(city.toLowerCase()));
  };

  public updatePharmacyById = async (pharmacyData: TPharmacy, id: number) => {
    const pharmacy = await this.db.pharmacy.update({
      where: { id },
      data: {
        ...pharmacyData,
        nameSlug: slugify(pharmacyData.name),
        storeHours: pharmacyData.storeHours.toUpperCase(),
      },
    });

    return pharmacy;
  };

  public deletePharmacyById = async (id: number) => {
    const pharmacy = await this.db.pharmacy.update({
      where: { id },
      data: {
        deletedAt: this.convertDateToISO(this.dateNow()),
      },
    });

    return pharmacy;
  };

  public forceDeletePharmacyById = async (id: number) => {
    const pharmacy = await this.db.pharmacy.delete({
      where: { id },
    });

    return pharmacy;
  };

  public createPharmacy = async (pharmacyData: TPharmacy) => {
    const pharmacy = await this.db.pharmacy.create({
      data: {
        ...pharmacyData,
        nameSlug: slugify(pharmacyData.name),
        storeHours: pharmacyData.storeHours.toUpperCase(),
      },
    });

    return pharmacy;
  };

  public getPharmacyRatings = async () => {
    const pharmacyRatings = await this.db.pharmacyRating.findMany({
      orderBy: [{ id: "desc" }],
    });

    return pharmacyRatings;
  };

  public createPharmacyRating = async (pharmacyRatingData: TPharmacyRating) => {
    const pharmacyRating = await this.db.pharmacyRating.create({
      data: {
        ...pharmacyRatingData,
      },
    });

    return pharmacyRating;
  };
}
