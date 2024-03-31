const prismaGenerate = require('../commands/prisma-generate')
const { spawn } = require('child_process');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: Service not specified. Please specify the service.');
  process.exit(1);
}

const service = args[0];

prismaGenerate(service).then(() => {
  const childProcess = spawn('nest', ['start', '--watch', service], { stdio: 'inherit' });

  childProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`The process ended with an error: ${code}`);
      process.exit(code);
    }
  });
})
