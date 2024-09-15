//script that is used to execute other scripts

const terminal = require('terminal-kit').terminal;

terminal.clear();

terminal.grabInput(true);

terminal.on('key', function (name) {
  // Detect CTRL-C and exit 'manually'
  if (name === 'CTRL_C') {
    terminal.red('\nCTRL-C detected. Exiting...\n');
    process.exit();
  }
});

// list scripts that are available
// get names of files in relative current directory
const fs = require('fs');

//remove main.js from the list
const scriptFiles = fs.readdirSync('./src/scripts').filter(file => file !== 'main.js');

terminal.green('Available scripts:\n');
scriptFiles.forEach((script, index) => {
  terminal.yellow(`${index + 1}. ${script}\n`);
});

terminal.down(1).green('Enter the number of the script you want to run: ');

terminal.inputField(function (error, input) {
  if (error) {
    terminal.red(error);
    process.exit();
  }

  const selectedScript = scriptFiles[input - 1];

  if (!selectedScript) {
    terminal.red('Invalid script number. Exiting...\n');
    process.exit();
  }

  terminal.green(`\nRunning ${selectedScript}...\n`);

  require(`./${selectedScript}`);
});
