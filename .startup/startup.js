const prismaGenerate = require('./commands/prisma-generate');
const prismaMigrate = require('./commands/prisma-migrate');
const nestBuild = require('./commands/nest-build');

async function boostrap() {
  await prismaGenerate()
  await prismaMigrate()
  await nestBuild()
}

boostrap()
