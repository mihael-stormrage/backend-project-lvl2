import { Command } from 'commander/esm.mjs';

const program = new Command();

program.name('gendiff').version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('', 'output usage information')
  .option('-f, --format [type]', 'output format');

export default program;
