import { Pharmacy } from "@prisma/client";
import { BaseService } from "~/modules/base.service";
import { TPharmacy, TPharmacyRating } from "~/modules/pharmacies/pharmacies.dto";
import { slugify } from "~/utilities/string.util";
import { hashPassword } from "~/utilities/password.util";

export class PharmaciesService extends BaseService {
  constructor() {
    super();
  }

  public getPharmacies = async () => {
    const pharmacies = await this.db.pharmacy.findMany({
      orderBy: [{ id: "desc" }],
      where: {
        deletedAt: null,
      },
      include: {
        user: true,
      },
    });

    return pharmacies;
  };

  public getPharmacyById = async (id: number) => {
    const pharmacy = await this.db.pharmacy.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!pharmacy) return "PHARMACY_NOT_FOUND";

    return pharmacy;
  };

  public getPharmacyByCity = async (city: string) => {
    const pharmacies = await this.db.pharmacy.findMany();

    return pharmacies.filter((pharmacy: Pharmacy) => pharmacy.address.toLowerCase().includes(city.toLowerCase()));
  };

  public getArchivedPharmacies = async () => {
    const pharmacies = await this.db.pharmacy.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
    });

    return pharmacies;
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

  public restoreArchivedPharmacyById = async (id: number) => {
    const pharmacy = await this.db.pharmacy.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });

    return pharmacy;
  };

  public createPharmacy = async (pharmacyData: TPharmacy) => {
    const pharmacyUser = await this.db.user.create({
      data: {
        accountNo: Math.floor(Math.random() * 1000000) + "-PHARMAACCT",
        name: slugify(pharmacyData.name).toUpperCase(),
        email: pharmacyData.email,
        password: await hashPassword(pharmacyData.password),
        userType: "pharmacy_staff",
      },
    });

    // @ts-ignore
    delete pharmacyData.email;
    // @ts-ignore
    delete pharmacyData.password;

    const pharmacy = await this.db.pharmacy.create({
      data: {
        ...pharmacyData,
        nameSlug: slugify(pharmacyData.name),
        storeHours: pharmacyData.storeHours.toUpperCase(),
        userId: pharmacyUser.id,
      },
    });

    return pharmacy;
  };

  public getPharmacyRatings = async () => {
    const pharmacyRatings = await this.db.pharmacyRating.findMany({
      orderBy: [{ id: "desc" }],
      include: {
        customerOrder: true,
        pharmacy: true,
        user: true,
      },
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

  public uploadPharmacyLogo = async (logo: any) => {
    //
  };

  public deletePharmacyLogo = async (logoId: number) => {
    //
  };
}
