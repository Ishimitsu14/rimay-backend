const protoGenerate = require('./../commands/proto-generate')

const args = process.argv.slice(2);
let selectedService = null;

if (args.length) {
  selectedService = args[0]
}

protoGenerate(selectedService)
