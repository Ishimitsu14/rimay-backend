const { exec } = require('child_process');
const { join } = require('path');
const fs = require('fs');
const executeCommand = require('./executeCommand')

const servicesDirectory = join(process.cwd(), 'apps');

function runNestBuildCommand(serviceName) {
  const command = `nest build ${serviceName}`;
  return executeCommand(command)
}

async function start() {
  const services = fs.readdirSync(servicesDirectory);
  for (const service of services) {
    await runNestBuildCommand(service)
    console.log('Service:', service, 'built');
  }
}

module.exports = start
