import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utilities/password.util";

const prisma = new PrismaClient();

const SEED_CONFIG = {
  users: true,
};

async function main() {
  if (SEED_CONFIG.users) {
    /**
     * Users seeder
     */

    await prisma.user.createMany({
      data: [
        {
          accountNo: "useradmin08172023",
          name: "Admin User",
          email: "admin@domain.com",
          password: await hashPassword("1234567890"),
          accountVerified: false,
          userType: "admin",
        },
        {
          accountNo: "userpharmacy08172023",
          name: "Pharmacy Staff",
          email: "pharmastaff@domain.com",
          password: await hashPassword("1234567890"),
          accountVerified: false,
          userType: "pharmacy_staff",
        },
        {
          accountNo: "usercustomer10012023",
          name: "Customer User",
          email: "customer@domain.com",
          password: await hashPassword("1234567890"),
          accountVerified: true,
          userType: "customer",
        },
      ],
    });
  }
}

/**
 * Execute seeders
 */
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
