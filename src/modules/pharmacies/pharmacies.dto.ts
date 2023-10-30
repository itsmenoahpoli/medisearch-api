import { IsNotEmpty, IsString } from "class-validator";

export type TPharmacy = {
  name: string;
  nameSlug: string;
  address: string;
  storeHours: string;
  contactNumber: string;
};

export class PharmacyDTO implements TPharmacy {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nameSlug: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  storeHours: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;
}
