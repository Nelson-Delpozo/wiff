import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Define the email signups to insert
  const emailSignups = [
    { email: "test1@example.com" },
    { email: "test2@example.com" },
    { email: "test3@example.com" },
  ];

  // Insert each email signup into the database
  for (const signup of emailSignups) {
    await prisma.emailSignup.create({
      data: signup,
    });
  }

  console.log("Seed data successfully added to the database!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
