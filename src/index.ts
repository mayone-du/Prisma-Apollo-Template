import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      isActive: true,
      isAdmin: false,
      profile: {
        create: { intro: "I like turtles" },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
