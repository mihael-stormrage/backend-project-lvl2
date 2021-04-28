import { Command } from 'commander/esm.mjs';

const program = new Command();

program.name('gendiff').version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('', 'output usage information')
  .option('-f, --format [type]', 'output format');

export default program;
