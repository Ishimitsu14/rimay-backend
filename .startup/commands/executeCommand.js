const { exec } = require('child_process');

module.exports = function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command execution error: ${error}`);
        reject(error);
      }
      console.log(stdout);
      resolve()
    });
  })
}
