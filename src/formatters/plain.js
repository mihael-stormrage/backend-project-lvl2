import _ from 'lodash';

const typeStrings = {
  unchanged: () => '',
  removed: (path) => `Property '${path}' was removed\n`,
  added: (path, value) => `Property '${path}' was added with value: ${value}\n`,
  old: (path, value) => `Property '${path}' was updated. From ${value}`,
  new: (_path, value) => ` to ${value}\n`,
};

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
    const pathString = path?.join('.');

    return typeStrings[type](pathString, getValue());
  }, []).join('');

export default plain;
