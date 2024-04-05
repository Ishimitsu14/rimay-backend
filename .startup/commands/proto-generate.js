const fs = require('fs');
const { exec } = require('child_process');
const { join } = require('path');
const executeCommand = require('./executeCommand');
const protoInputDir = join(process.cwd(), `proto`)
const protoOutputDirectory = join(process.cwd(), 'shared/grpc');
const protoPluginFile = join(process.cwd(), 'node_modules/.bin/protoc-gen-ts_proto')


function runProtoGenerateCommand(protoName) {
  const command = `protoc -I=${protoInputDir} --plugin=protoc-gen-ts_proto=${protoPluginFile} --ts_proto_out=${protoOutputDirectory} ${protoName}`
  return executeCommand(command)
}

async function start(selectedService) {
  const protobufs = fs.readdirSync(protoInputDir);
  for (const protobuf of protobufs) {
    await runProtoGenerateCommand(protobuf)
    console.log(`The schema for the "${protobuf}" has been successfully generated`)
  }
}

module.exports = start
