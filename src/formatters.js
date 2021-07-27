import _ from 'lodash';

const stylish = (ast, space = 1) => {
  const indent = '  ';
  const lines = _.sortBy(ast, ['name'])
    .reduce((acc, {
      type, name, children, value, nested,
    }) => {
      const getValue = () => (nested ? stylish(children, space + 1) : value);

      if (type === 'unchanged') acc.push(`${indent.repeat(space * 2)}${name}: ${getValue()}`);
      if (type === 'old') acc.push(`${indent.repeat(space * 2 - 1)}- ${name}: ${getValue()}`);
      if (type === 'new') acc.push(`${indent.repeat(space * 2 - 1)}+ ${name}: ${getValue()}`);

      return acc;
    }, []);
  return `{\n${lines.join('\n')}\n${indent.repeat(space * 2 - 2)}}`;
};

export default stylish;
