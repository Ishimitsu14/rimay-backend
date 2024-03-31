const fs = require('fs');
const { exec } = require('child_process');
const { join } = require('path');
const executeCommand = require('./executeCommand');

const servicesDirectory = join(process.cwd(), 'apps');
const protoInputDir = join(process.cwd(), `proto`)
const protoOutputDirectory = join(process.cwd(), 'shared/grpc');
const protoPluginFile = join(process.cwd(), 'node_modules/.bin/protoc-gen-ts_proto')


function runProtoGenerateCommand(serviceName) {
  const command = `protoc -I=${protoInputDir} --plugin=protoc-gen-ts_proto=${protoPluginFile} --ts_proto_out=${protoOutputDirectory} ${serviceName}.proto`
  return executeCommand(command)
}

async function start(selectedService) {
  const services = fs.readdirSync(servicesDirectory);
  for (const service of services) {
    if (selectedService && selectedService !== service) {
      continue;
    }
    if (fs.existsSync(join(protoInputDir, `${service}.proto`))) {
      await runProtoGenerateCommand(service)
      console.log(`The schema for the "${service}" service has been successfully generated`)
    } else {
      console.log(`Service: ${service} has no proto schema`)
    }
  }
}

module.exports = start
