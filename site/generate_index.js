import fs from 'fs';
import path from 'path';

const contentDir = './src/content';
const files = fs.readdirSync(contentDir)
  .filter(f => f.endsWith('.md'))
  .map(f => ({
    name: f,
    content: fs.readFileSync(path.join(contentDir, f), 'utf8')
  }));

fs.writeFileSync('./src/content/index.json', JSON.stringify(files));
console.log('Generated src/content/index.json');
