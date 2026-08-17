const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // Upsert Farmer
  await prisma.user.upsert({
    where: { email: 'farmer@navya.com' },
    update: {},
    create: {
      email: 'farmer@navya.com',
      name: 'Farmer Test',
      passwordHash: passwordHash,
      role: 'FARMER',
    },
  });

  // Upsert Aggregator
  await prisma.user.upsert({
    where: { email: 'aggregator@navya.com' },
    update: {},
    create: {
      email: 'aggregator@navya.com',
      name: 'Aggregator Test',
      passwordHash: passwordHash,
      role: 'AGGREGATOR',
    },
  });

  console.log('Test accounts seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
