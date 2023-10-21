import { IsNotEmpty, IsString, IsNumber, IsDateString } from "class-validator";

export type TMedicine = {
  itemNumber: string;
  name: string;
  nameSlug: string;
  category: string;
  price: number;
  quantity: number;
  expirationDate: string;
  reservationDate: string;
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
  nameSlug: string;

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
  @IsDateString()
  expirationDate: string;

  @IsNotEmpty()
  @IsDateString()
  reservationDate: string;
}
