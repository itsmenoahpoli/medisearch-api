import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export type TMedicine = {
  itemNumber: string;
  name: string;
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
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  expirationDate: string;

  @IsNotEmpty()
  @IsString()
  reservationDate: string;
}
