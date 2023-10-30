import { BaseService } from "~/modules/base.service";
import { TPharmacy } from "~/modules/pharmacies/pharmacies.dto";
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

  public getPharmacyByItemNumber = async (id: number) => {
    const pharmacy = await this.db.pharmacy.findUnique({
      where: {
        id,
      },
    });

    if (!pharmacy) return null;

    return pharmacy;
  };

  public updatePharmacyById = async (pharmacyData: TPharmacy, id: number) => {
    const pharmacy = await this.db.pharmacy.update({
      where: { id },
      data: {
        ...pharmacyData,
        nameSlug: slugify(pharmacyData.name),
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
      },
    });

    return pharmacy;
  };
}
