import { IsNotEmpty, IsString } from "class-validator";

export type TPharmacy = {
  name: string;
  nameSlug?: string;
  address: string;
  coords: string;
  storeHours: string;
  contactNumber: string;
};

export class PharmacyDTO implements TPharmacy {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  coords: string;

  @IsNotEmpty()
  @IsString()
  storeHours: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;
}
