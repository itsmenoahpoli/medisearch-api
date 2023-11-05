import { IsNotEmpty, IsBoolean, IsString, IsArray, IsEnum, ValidateNested, IsNumber } from "class-validator";

export enum TOrderType {
  ORDER = "order",
  RESERVE = "reserve",
}

export type TOrderCartContentItem = {
  medicineId: number;
  snapshotPrice: number;
};

export type TOrder = {
  type: TOrderType;
  userId: number;
  pharmacyId: number;
  isReservation: boolean;
  cartContent: TOrderCartContentItem[];
  totalAmount: number;
};

export class OrderDTO implements TOrder {
  @IsNotEmpty()
  @IsString()
  @IsEnum(TOrderType)
  type: TOrderType;

  @IsNotEmpty()
  @IsNumber()
  pharmacyId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsBoolean()
  isReservation: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  cartContent: TOrderCartContentItem[];

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}
