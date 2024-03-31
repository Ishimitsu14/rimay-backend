const fs = require('fs');
const { exec } = require('child_process');
const { join } = require('path');
const executeCommand = require('./executeCommand');

const servicesDirectory = join(process.cwd(), 'apps');

function runPrismaMigrateCommand(schemaPath, prismaCommand) {
  const command = `prisma migrate ${prismaCommand} --schema=${schemaPath}`;
  return executeCommand(command)
}

async function start(command = null, selectedService = null) {
  const services = fs.readdirSync(servicesDirectory);
  for (const service of services) {
    const prismaSchema = join(servicesDirectory, service, 'src/prisma', 'schema.prisma')
    if (selectedService && selectedService !== service) {
      continue;
    }
    if (fs.existsSync(prismaSchema)) {
      await runPrismaMigrateCommand(prismaSchema, command || 'deploy')
      console.log(`The database for the "${service}" service has been successfully migrate`)
    } else {
      console.log(`Service: ${service} has no prisma schema`)
    }
  }
}


module.exports = start
