const fs = require('fs');
const { exec } = require('child_process');
const { join } = require('path');
const executeCommand = require('./executeCommand');

const servicesDirectory = join(process.cwd(), 'apps');

function runPrismaGenerateCommand(schemaPath) {
  const command = `prisma generate --schema=${schemaPath}`;
  return executeCommand(command)
}

async function start(selectedService = null) {
  const services = fs.readdirSync(servicesDirectory);
  for (const service of services) {
    const prismaSchema = join(servicesDirectory, service, 'src/prisma', 'schema.prisma')
    if (selectedService && selectedService !== service) {
      continue;
    }
    if (fs.existsSync(prismaSchema)) {
      await runPrismaGenerateCommand(prismaSchema)
      console.log(`The schema for the "${service}" service has been successfully generated`)
    } else {
      console.log(`Service: ${service} has no prisma schema`)
    }
  }
}

module.exports = start
