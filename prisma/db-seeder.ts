import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const seederConfig = {
  users: false,
  userTypes: false,
};
