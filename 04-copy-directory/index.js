const fs = require('fs/promises');
const path = require('path');

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });

    const entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        const content = await fs.readFile(srcPath);
        await fs.writeFile(destPath, content);
      }
    }
  } catch (err) {
    console.error('Copy error:', err);
  }
}

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

copyDir(srcDir, destDir);
