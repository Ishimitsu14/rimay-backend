const prismaGenerate = require('./../commands/prisma-generate')

const args = process.argv.slice(2);
let selectedService = null;

if (args.length) {
  selectedService = args[0]
}

prismaGenerate(selectedService)
