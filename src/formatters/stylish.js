import _ from 'lodash';

const stylish = (ast, space = 1) => {
  const indent = '  ';
  const lines = _.sortBy(ast, ['name'])
    .reduce((acc, {
      type, name, children, value, nested,
    }) => {
      const getValue = () => (nested ? stylish(children, space + 1) : value);
      const getLine = () => {
        if (type === 'unchanged') return `${indent.repeat(space * 2)}${name}: ${getValue()}`;
        if (type === 'old' || type === 'removed') return `${indent.repeat(space * 2 - 1)}- ${name}: ${getValue()}`;
        if (type === 'new' || type === 'added') return `${indent.repeat(space * 2 - 1)}+ ${name}: ${getValue()}`;
        throw new Error('Unexpected node type!');
      };
      return [...acc, getLine()];
    }, []);
  return `{\n${lines.join('\n')}\n${indent.repeat(space * 2 - 2)}}`;
};

export default stylish;
