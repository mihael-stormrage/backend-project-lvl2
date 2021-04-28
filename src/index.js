import { Command } from 'commander/esm.mjs';
import fs from 'fs';
import _ from 'lodash';

const getData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const genDiff = (data1, data2) => {
  if (_.isEqual(data1, data2)) return JSON.stringify(data1);
  const indent = '  ';
  const diff = _.mergeWith(_.cloneDeep(data1), data2, (oldVal, newVal) => ({ oldVal, newVal }));
  const lines = _.sortBy(Object.entries(diff))
    .map(([k, val]) => [k, typeof val !== 'object' ? { oldVal: val } : val])
    .reduce((acc, [key, { oldVal, newVal }]) => {
      if (oldVal === newVal) {
        acc.push(`${indent.repeat(2)}${key}: ${oldVal}`);
        return acc;
      }
      if (oldVal !== undefined) acc.push(`${indent}- ${key}: ${oldVal}`);
      if (newVal !== undefined) acc.push(`${indent}+ ${key}: ${newVal}`);
      return acc;
    }, []);
  return `{\n${lines.join('\n')}\n}`;
};

const program = new Command();

program.name('gendiff').version('0.0.5')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('', 'output usage information')
  .option('-f, --format [type]', 'output format');

export { genDiff as default, program as gendiff, getData };
