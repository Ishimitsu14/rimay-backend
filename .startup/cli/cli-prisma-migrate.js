const prismaMigrate = require('./../commands/prisma-migrate')

const args = process.argv.slice(2);
let command = null;
let selectedService = null;

if (args.length) {
  command = args[0]
  selectedService = args[1]
}

if (!command) {
  console.log('unknown or unexpected command\n')
  console.log('\x1b[1m%s\x1b[0m', 'Examples\n')
  console.log(' ', 'Create a migration from changes in Prisma schema, apply it to the database, trigger generators (e.g. Prisma Client)')
  console.log('  $', 'yarn prisma:migrate dev\n\n')
  console.log(' ', 'Reset your database and apply all migrations')
  console.log('  $', 'yarn prisma:migrate reset\n\n')
  console.log(' ', 'Apply pending migrations to the database')
  console.log('  $', 'yarn prisma:migrate deploy\n\n')
  console.log(' ', 'You can run these commands for the selected service')
  console.log('  $', 'yarn prisma:migrate {dev/reset/deploy} {service_name}\n\n')
  process.exit(1)
}

prismaMigrate(command, selectedService)
