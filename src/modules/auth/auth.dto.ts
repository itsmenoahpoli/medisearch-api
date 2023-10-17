import { IsNotEmpty, IsString, IsEnum } from "class-validator";

export enum EnumLoginType {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export type TCredentials = {
  email: string;
  password: string;
  loginType: EnumLoginType;
};

export class CredentialsDTO implements TCredentials {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(EnumLoginType)
  loginType: EnumLoginType;
}
