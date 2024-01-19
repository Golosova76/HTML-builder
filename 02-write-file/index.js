const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const output = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  'Enter the text to be written to the file. To exit, type "exit" or use CTRL+C.',
);

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    output.write(input + '\n');
  }
});

rl.on('close', () => {
  console.log('File recording is complete. Goodbye!');
  output.end();
  process.exit(0);
});
