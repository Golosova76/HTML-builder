const fs = require('fs/promises');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const stylePath = path.join(projectDist, 'style.css');
const assetsPath = path.join(__dirname, 'assets');
const templatePath = path.join(__dirname, 'template.html');

async function buildPage() {
  try {
    await fs.mkdir(projectDist, { recursive: true });

    let template = await fs.readFile(templatePath, 'utf-8');
    const componentFiles = await fs.readdir(componentsPath, {
      withFileTypes: true,
    });

    for (const file of componentFiles) {
      if (file.isFile() && path.extname(file.name) === '.html') {
        const name = path.basename(file.name, '.html');
        const componentContent = await fs.readFile(
          path.join(componentsPath, file.name),
          'utf-8',
        );
        template = template.replace(
          new RegExp(`{{${name}}}`, 'g'),
          componentContent,
        );
      }
    }

    await fs.writeFile(path.join(projectDist, 'index.html'), template);

    await compileStyles(stylesPath, stylePath);

    await copyDir(assetsPath, path.join(projectDist, 'assets'));

    console.log('The page is assembled successfully!');
  } catch (error) {
    console.error('Error during page build:', error);
  }
}

async function compileStyles() {
  try {
    const files = await fs.readdir(stylesPath, { withFileTypes: true });

    let cssContent = '';
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesPath, file.name);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        cssContent += fileContent + '\n';
      }
    }

    await fs.writeFile(stylePath, cssContent);
    console.log('style.css was successfully created!');
  } catch (err) {
    console.error('Error during styles compilation:', err);
  }
}

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

buildPage();
