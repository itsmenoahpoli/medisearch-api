import { IsNotEmpty, IsString, IsNumber, IsObject } from "class-validator";
import { Type } from "class-transformer";

export type TUserAddressCoords = {
  long: string;
  lat: string;
};

export type TUserAddress = {
  label: string;
  address: string;
  coords: TUserAddressCoords;
  userId: number;
};

export class UserAddressDTO implements TUserAddress {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsObject()
  coords: TUserAddressCoords;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
