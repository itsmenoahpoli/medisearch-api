import { IsNotEmpty, IsString, IsNumber, IsInt } from "class-validator";

export type TMedicine = {
  itemNumber: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  pharmacyId: number;
  expirationDate: string;
  reservationDate: string;
};

export type TMedicineRating = {
  medicineId: number;
  customerOrderId: number;
  rating: number;
};

export class MedicineDTO implements TMedicine {
  @IsNotEmpty()
  @IsString()
  itemNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  pharmacyId: number;

  @IsNotEmpty()
  @IsString()
  expirationDate: string;

  @IsNotEmpty()
  @IsString()
  reservationDate: string;
}

export class MedicineRatingDTO implements TMedicineRating {
  @IsNotEmpty()
  @IsInt()
  medicineId: number;

  @IsNotEmpty()
  @IsInt()
  customerOrderId: number;

  @IsNotEmpty()
  @IsInt()
  rating: number;
}
