import fs from 'fs';
import path from 'path';

const dir = './src';

function walkDir(currentDirPath) {
  const files = fs.readdirSync(currentDirPath);
  files.forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('figma:asset/')) {
        content = content.replace(/figma:asset\//g, '@/assets/');
        fs.writeFileSync(filePath, content, 'utf8');
      }
    } else if (stat.isDirectory()) {
      walkDir(filePath);
    }
  });
}

walkDir(dir);
console.log('Finished replacing figma:asset/ with @/assets/');
