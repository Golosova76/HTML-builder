const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', function (chunk) {
  console.log(chunk);
});

readStream.on('error', function (err) {
  console.error('An error has occurred:', err.message);
});
