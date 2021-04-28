import { Command } from 'commander/esm.mjs';

export const getData = (path) => {};

const genDiff = (data1, data2) => {

};

const program = new Command();

program.name('gendiff').version('0.0.4')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('', 'output usage information')
  .option('-f, --format [type]', 'output format');

export default program;
