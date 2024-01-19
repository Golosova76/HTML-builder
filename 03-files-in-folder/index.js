const fs = require('fs');
const path = require('path');

function displayFilesInfo(folderPath) {
  fs.readdir(folderPath, { withFileTypes: true }, (err, filesAndDirs) => {
    if (err) {
      console.error('Error reading a folder:', err);
      return;
    }

    filesAndDirs.forEach((dirent) => {
      if (dirent.isFile()) {
        const filePath = path.join(folderPath, dirent.name);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('Error while obtaining file information:', err);
            return;
          }
          const ext = path.extname(dirent.name);
          const name = path.basename(dirent.name, ext);
          const sizeInKb = (stats.size / 1024).toFixed(2);
          console.log(`${name} - ${ext.slice(1)} - ${sizeInKb}kb`);
        });
      }
    });
  });
}

const secretFolderPath = path.join(__dirname, 'secret-folder');

displayFilesInfo(secretFolderPath);
