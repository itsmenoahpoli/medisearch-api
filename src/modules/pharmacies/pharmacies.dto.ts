import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export type TPharmacy = {
  name: string;
  nameSlug?: string;
  address: string;
  coords: string;
  storeHours: string;
  contactNumber: string;
  email: string;
  password: string;
};

export type TPharmacyRating = {
  pharmacyId: number;
  userId: number;
  customerOrderId: number;
  rating: number;
  feedback?: string;
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

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class PharmacyRatingDTO implements TPharmacyRating {
  @IsNotEmpty()
  @IsInt()
  pharmacyId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  customerOrderId: number;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  feedback: string;
}
