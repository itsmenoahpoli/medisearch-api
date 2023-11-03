import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

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

  public dateNow = () => {
    return dayjs().format("MM/DD/YYYY");
  };

  public nowSs = () => {
    return dayjs().format("ssZ");
  };
}
