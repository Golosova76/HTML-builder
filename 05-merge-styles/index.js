const fs = require('fs/promises');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'bundle.css');

async function compileStyles() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const files = await fs.readdir(stylesDir, { withFileTypes: true });

    const cssFiles = files.filter(
      (dirent) => dirent.isFile() && path.extname(dirent.name) === '.css',
    );

    let bundleContent = '';
    for (const file of cssFiles) {
      const filePath = path.join(stylesDir, file.name);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      bundleContent += fileContent + '\n';
    }

    await fs.writeFile(outputFile, bundleContent);
    console.log('bundle.css was successfully created!');
  } catch (err) {
    console.error('Error:', err);
  }
}

compileStyles();
