import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./../src/utilities/password.util";

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
          accountNo: "user08172023",
          name: "John Doe",
          email: "johndoe@domain.com",
          password: await hashPassword("1234567890"),
          accountVerified: false,
          userType: "admin",
        },
        {
          accountNo: "customer10012023",
          name: "Dhaine Dhaine",
          email: "dhaine@domain.com",
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
