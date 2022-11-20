import _ from 'lodash';

const flattenByPath = (e) => {
  if (!e.nested) return e;
  const { children, ...item } = e;
  return [item, _.flatMapDeep(children, flattenByPath)];
};

const plain = (ast) => _.sortBy(_.flatMapDeep(ast, flattenByPath), ['path'])
  .map(({
    type, path, value, nested,
  }) => {
    const getValue = () => (nested ? '[complex value]' : (typeof value === 'string' && `'${value}'`) || value);
    const prop = path?.join('.');

    if (type === 'unchanged') return '';
    if (type === 'removed') return `Property '${prop}' was removed\n`;
    if (type === 'added') return `Property '${prop}' was added with value: ${getValue()}\n`;
    if (type === 'old') return `Property '${prop}' was updated. From ${getValue()}`;
    if (type === 'new') return ` to ${getValue()}\n`;
  }, []).join('');

export default plain;
