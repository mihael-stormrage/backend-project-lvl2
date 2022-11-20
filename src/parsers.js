import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml':
    case '.yaml':
      return yaml.load;
    default:
      throw new Error('Unknown file extension');
  }
};

const getData = (file) => {
  const parse = getParser(path.extname(file));
  return parse(fs.readFileSync(file, 'utf8'));
};

export default getData;
