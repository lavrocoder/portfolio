const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../content/projects');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_'));

const max = files.reduce((acc, file) => {
  const { order } = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  return Math.max(acc, order ?? 0);
}, 0);

console.log(max);
