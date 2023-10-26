import { PrismaClient } from "@prisma/client";

export class BaseService {
  protected prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  protected get db() {
    return this.prismaClient;
  }

  public convertDateToISO = (dateStr: string) => {
    return new Date(dateStr).toISOString();
  };
}
