import { IsNotEmpty, IsString, IsEnum } from "class-validator";

export enum TAuthType {
  ADMIN = "admin",
  PHARMACY_STAFF = "pharmacy_staff",
  CUSTOMER = "customer",
}

export type TCredentials = {
  email: string;
  password: string;
  authType: TAuthType;
};

export class CredentialsDTO implements TCredentials {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(TAuthType)
  authType: TAuthType;
}
