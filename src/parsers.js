import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const getData = (file) => {
  const parse = (() => {
    switch (path.extname(file)) {
      case '.json':
        return JSON.parse;
      case '.yml':
      case '.yaml':
        return yaml.load;
      default:
        throw new Error('Unknown file extension');
    }
  })();
  return parse(fs.readFileSync(file, 'utf8'));
};

export default getData;
