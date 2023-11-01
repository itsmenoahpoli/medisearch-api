import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export type TUserAddress = {
  label: string;
  address: string;
  coords: string;
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
  @IsString()
  coords: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
