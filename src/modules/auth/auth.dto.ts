import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";

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

export type TUserProfile = {
  name: string;
  email: string;
  password?: string;
};

export type TCustomerRegister = TCredentials & { name: string };

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

export class UserProfileDTO implements TUserProfile {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
