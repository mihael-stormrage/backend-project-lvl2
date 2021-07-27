import { Command } from 'commander/esm.mjs';
import _ from 'lodash';
import getData from './parsers.js';
import stylish from './formatters.js';

const genDiff = (data1, data2, formatter = stylish) => {
  if (_.isEqual(data1, data2)) return 'No difference';

  const makeDiffAst = (obj1, obj2) => {
    const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
    return keys.flatMap((key) => {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const isNested = (v) => typeof v === 'object' && v !== null;

      const processChanged = (val, name, type) => {
        const result = [];
        if (val !== undefined) {
          const node = { type, name, nested: isNested(val) };
          if (node.nested) node.children = _.flatMap(val, (v, k) => processChanged(v, k, 'unchanged'));
          else node.value = val;
          result.push(node);
        }
        return result;
      };

      switch (true) {
        case isNested(val1) && isNested(val2):
          return {
            type: 'unchanged', name: key, children: makeDiffAst(val1, val2), nested: true,
          };
        case val1 === val2:
          return {
            type: 'unchanged', name: key, value: val1, nested: false,
          };
        default:
          return [processChanged(val1, key, 'old'), processChanged(val2, key, 'new')].flat();
      }
    });
  };

  const diff = makeDiffAst(data1, data2);
  return formatter(diff);
};

const program = new Command();

program.name('gendiff').version('0.2.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => console.log(genDiff(getData(file1), getData(file2))));

export { genDiff as default, program as gendiff };
